from flask import Flask, jsonify, request, render_template
from bson.json_util import dumps
from flask_cors import CORS
from Database.conexiondb import conexiondb

app = Flask(__name__)
CORS(app)

# TEMPLES para el frontend html
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/votarPagina')
def votarPagina():
    return render_template('votar.html')

@app.route('/resultadosPagina')
def resultadosPagina():
    return render_template('resultados.html')

# ENDPOINTS
@app.route('/users', methods=['GET'])
def get_users():
    db = conexiondb()
    rows = db.fetch_all_as_dict("SELECT * FROM users")
    return jsonify({"status": True, 'message': 'GET users', 'data': rows})

@app.route('/votante', methods=['GET'])
def get_votante():
    db = conexiondb()
    rows = db.fetch_all_as_dict("SELECT * FROM votante")
    return jsonify({"status": True, 'message': 'GET votante', 'data': rows})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)