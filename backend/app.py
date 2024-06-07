from flask import Flask, jsonify, request, render_template
from bson.objectid import ObjectId
from bson.json_util import dumps
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html', user="ricardo")

@app.route('/users', methods=['GET'])
def get_users():
    users = [
        {"id": 1, "name": "User 1"},
        {"id": 2, "name": "User 2"},
        {"id": 3, "name": "User 3"}
    ]
    return jsonify({'message': 'GET users', 'users': users})


if __name__ == '__main__':
    app.run(debug=True)