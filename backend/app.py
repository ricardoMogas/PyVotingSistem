from flask import Flask, jsonify, request, render_template
from bson.json_util import dumps
from flask_cors import CORS
from Database.conexiondb import conexiondb
from DAO.Votante import Votante
from DAO.Casilla import Casilla
from DAO.Voto import VotoDAO
from DAO.Partido import Partido
from DAO.Users import Users
from DAO.CandidatoPre import CandidatoPre
from datetime import date


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
#USERS
@app.route('/officials', methods=['GET'])
def get_users():
    db = conexiondb()
    rows = db.fetch_all_as_dict("SELECT * FROM users WHERE rol = 1")
    return jsonify({"status": True, 'message': 'GET users', 'data': rows})

@app.route('/add_official', methods=['POST'])
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