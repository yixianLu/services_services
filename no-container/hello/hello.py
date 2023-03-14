import requests
from flask import Flask, jsonify
import json
app = Flask(__name__)

localhost = 'localhost'

@app.route('/')
def get_data():
    pi1_get = requests.get('http://localhost:8000/pi1')
    pi1_text = json.loads(pi1_get.text)
    pi2_get = requests.get('http://localhost:8081/pi2')
    pi2_text = json.loads(pi2_get.text)
    pi_List = pi1_text+pi2_text
    return jsonify(pi_List),200


if __name__=='__main__':
    app.run(host=localhost, port=5000, debug=True)