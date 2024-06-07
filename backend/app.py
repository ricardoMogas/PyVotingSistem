from flask import Flask, jsonify, request, render_template
from bson.objectid import ObjectId
from bson.json_util import dumps
from flask_cors import CORS
from Database.conexiondb import conexiondb

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html', user="ricardo")

@app.route('/users', methods=['GET'])
def get_users():
    db = conexiondb()
    rows = db.fetch_all_as_dict("SELECT * FROM users")
    return jsonify({"status": True, 'message': 'GET users', 'data': rows})

@app.route('/users', methods=['POST'])
def create_user():
    db = conexiondb()
    name = request.json['name']
    credential = request.json['credential']
    db.execute_query("INSERT INTO users (name, credential) VALUES (?, ?)", (name, credential))
    return jsonify({"status": True, 'message': 'insert user'})

@app.route('/hello/<name>', methods=['GET'])
def update_user(name):
    return jsonify({"status": True, 'message': name})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)