from flask import Flask, jsonify, request, render_template
from bson.json_util import dumps
from flask_cors import CORS
from Database.conexiondb import conexiondb
from DAO.Users import Users
from DAO.Votante import Votante
from DAO.Casilla import Casilla
from DAO.Voto import VotoDAO
from DAO.Partido import Partido
from DAO.Users import Users
from DAO.Resultados import Resultados
from DAO.CandidatoPre import CandidatoPre
from DAO.Estado import Estado
from datetime import date
import base64

app = Flask(__name__)
CORS(app)

# TEMPLES para el frontend html ----------------------------------------------
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/votarPagina')
def votarPagina():
    return render_template('votar.html')

@app.route('/resultadosPagina')
def resultadosPagina():
    return render_template('resultados.html')

# ENDPOINTS ----------------------------------------------
# VOTOS
@app.route('/check_voto', methods=['POST'])
def check_voto():
    db = Votante()
    data = request.get_json()
    votante = db.get_one_votante(data['claveElec'])
    if votante:
        return jsonify({"status": votante[4] == 1})
    else:
        result = db.create_votante("Anonimo", data['claveElec'], data['id_estado'], 0, data['seccion'])
        return jsonify({"status": False, "message": result})  

@app.route('/votar', methods=['POST'])
def votar():
    casilla = Casilla()
    db = VotoDAO()
    data = request.get_json()
    resultCasilla = casilla.check_casilla_exists(data['seccion'], data['id_estado'])
    if not resultCasilla:
        return jsonify({"status": False, "message": "Casilla no existe."})
    resultVoto = db.insert_voto(date.today(), data['id_candPre'], resultCasilla[0])
    if resultVoto:
        votante = Votante()
        result = votante.update_bandera(data['claveElec'])
        if result:
            return jsonify({"status": True, "message": "Voto exitoso."})
    else:
        return jsonify({"status": False, "message": resultVoto})

@app.route('/votes_per_candidate', methods=['GET'])
def votes_per_candidate():
    db = conexiondb()
    candidato = CandidatoPre()
    query = 'SELECT Id_CandPre, COUNT(*) as votes FROM Voto GROUP BY Id_CandPre'
    results = db.execute_query(query).fetchall()
    json = []
    for result in results:
        candidato_data = candidato.get_one_candidato_pre(result[0])
        json.append({
            'nombre': candidato_data[1],
            'total': result[1]
        })
    return jsonify({"status": True, 'message': 'GET votes per candidate', 'data': json })

@app.route('/estados', methods=['GET'])
def get_estados():
    db = Estado()
    estados = db.get_estados()
    return jsonify({"status": True, 'message': 'GET votes per candidate', 'data': estados })

@app.route('/votes_per_casilla/<int:id_casilla>', methods=['GET'])
def votes_per_casilla(id_casilla):
    db = conexiondb()
    query = 'SELECT * FROM Voto WHERE Id_Casilla = ?'
    result = db.execute_query(query, (id_casilla,)).fetchall()
    jsonResult = []
    for row in result:
        candidato = CandidatoPre()
        candidatoData = candidato.get_one_candidato_pre(row[2])
        jsonResult.append({
            'Id_Voto': row[0],
            'Fecha': row[1],
            'Candidato': candidatoData[1],
            'Id_Casilla': row[3]
        })
    queryCount = 'SELECT Id_CandPre, COUNT(*) as votes FROM Voto WHERE Id_Casilla = ? GROUP BY Id_CandPre ORDER BY votes DESC'
    resultCount = db.execute_query(queryCount, (id_casilla,)).fetchall()
    for i in range(len(resultCount)):
        candidato = CandidatoPre()
        candidatoData = candidato.get_one_candidato_pre(resultCount[i][0])
        partido = Partido()
        partidoData = partido.get_one_Partido(candidatoData[2])
        resultCount[i] = {
            'nombre': candidatoData[1],
            'partido': partidoData[3],
            'total': resultCount[i][1]
        }
    return jsonify({"status": True, 'message': 'GET votes per casilla', 'data': jsonResult, "Count": resultCount})


@app.route('/add_resultado', methods=['POST'])
def add_resultado():
    db = Resultados()
    data = request.get_json()
    queryCount = 'SELECT COUNT(*) FROM Voto WHERE Id_Casilla = ?'
    resultCount = db.execute_query(queryCount, (data['Id_Casilla'],)).fetchone()
    result = db.insert_resultado(resultCount[0], data['Id_Casilla'], data['PDF'], date.today())
    if result == True:
        return jsonify({"status": True, "message": "Resultado agregado"})
    else:
        return jsonify({"status": False, "message": result})

# RESULTADOS
@app.route('/resultados/<int:Id_casilla>', methods=['GET'])
def get_resultados(Id_casilla):
    db = Resultados()
    result = db.get_resultado_by_casilla(Id_casilla)
    jsonData = []
    for row in result:
        pdf_base64 = base64.b64encode(row[3]).decode('utf-8')
        jsonData.append({
            'Id_RE': row[0],
            'totalVotos': row[1],
            'Id_Casilla': row[2],
            'PDF': pdf_base64,
            'date': row[4]
        })
    return jsonify({"status": True, 'message': 'GET resultados', 'data': jsonData})

# CANDIDATOS
@app.route('/candidatos', methods=['GET'])
def get_candidatos():
    db = CandidatoPre()
    partido_instance = Partido()  # Create an instance of the Partido class
    results = db.get_all_candidato_pre()
    json_result = []
    
    for row in results:
        # Convertir imagen a base64
        imagen_base64 = base64.b64encode(row[4]).decode('utf-8')
        partido = partido_instance.get_one_Partido(row[2])  # Get the partido object based on the Id_Part
        imagenPart_base64 = base64.b64encode(partido[2]).decode('utf-8')
        
        candidato = {
            'Id_CandPre': row[0],
            'nombreComp': row[1],
            'partido': partido[3],  # Add the partido object to the candidatso dictionary
            'descripcion': row[3],
            'imagen': imagen_base64,
            'imagenPart': imagenPart_base64
        }
        json_result.append(candidato)

    return jsonify({"status": True, 'message': 'GET candidatos', 'data': json_result})



# PARTISOS
@app.route('/partidos', methods=['GET'])
def get_partidos():
    db = Partido()
    rows = db.get_Partidos()
    return jsonify({"status": True, 'message': 'GET partidos', 'data': rows})

@app.route('/add_partido', methods=['POST'])
def add_partido():
    db = Partido()
    data = request.get_json()
    result = db.create_Partido(data['nombre'], data['siglas'], data['imagen'])
    if result == True:
        return jsonify({"status": True, "message": "Partido added successfully."})
    else:
        return jsonify({"status": False, "message": result})

@app.route('/partido/<int:id>', methods=['DELETE'])
def delete_partido(id):
    db = Partido()
    result = db.delete_Partido(id)
    if result:
        return jsonify({"status": True, "message": "Partido deleted successfully."})
    else:
        return jsonify({"status": False, "message": result})

# CASILLAS
@app.route('/casillas', methods=['GET'])
def get_casillas():
    db = Casilla()
    rows = db.get_casillas()
    return jsonify({"status": True, 'message': 'GET casillas', 'data': rows})

# USUARIOS
@app.route('/Login', methods=['POST'])
def Login():
    db = Users()
    data = request.get_json()
    user = db.get_user_exist(data['name'], data['password'])
    if user:
        dataJson = {
            'id_user': user[0],
            'name': user[1],
            'rol': user[2],
            'Id_Casilla': user[4]
        }
        return jsonify({"status": True, "message": "User logged in successfully.", "data": dataJson})
    else:
        return jsonify({"status": False, "message": "User not found."})

@app.route('/officials', methods=['GET'])
def get_users():
    db = conexiondb()
    rows = db.fetch_all_as_dict("SELECT * FROM users WHERE rol = 1")
    return jsonify({"status": True, 'message': 'GET users', 'data': rows})

@app.route('/add/official', methods=['POST'])
def add_user():
    db = Users()
    data = request.get_json()
    result = db.insert_user(data['name'], 1, data['password'], data['Id_Casilla'])
    if result == True:
        return jsonify({"status": True, "message": "User added successfully."})
    else:
        return jsonify({"status": False, "message": result})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)