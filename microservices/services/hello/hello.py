import requests
from flask import Flask, jsonify
import json
import os

app = Flask(__name__)
# TODO local host need to change to microservice request
pi1_network = 'pi1_network'
pi2_network = 'pi2_network'

@app.route('/')
def get_data():
    pi1_get = requests.get('http://pi1_network:8000/pi1')
    pi1_text = json.loads(pi1_get.text)
    pi2_get = requests.get('http://pi2_network:8081/pi2')
    pi2_text = json.loads(pi2_get.text)
    pi_List = pi1_text+pi2_text
    return jsonify(pi_List),200


if __name__=='__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=5000, debug=True)
