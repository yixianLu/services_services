import random
from flask import Flask, request, jsonify
import timeit
import os

app = Flask(__name__)


pi1_list=[

    {
        'len':0,
        'type':'Monte Carlo',
        'result':0,
        'time':0,
    }
]


@app.route('/pi1',methods=['GET','POST'])
def matrix():
    if request.method == 'GET':
        return jsonify(pi1_list),200

    if request.method == 'POST':
        new_len = request.form['len']
        start = timeit.timeit()
        n = int(new_len)
        count = 0
        for i in range(n):
            x = random.random()
            y = random.random()
            if x**2 + y**2 <= 1:
                count += 1
        pi = 4 * count / n
        end = timeit.timeit()
        new_obj = {
        'len':n,
        'type':'Monte Carlo',
        'result':pi,
        'time':end-start,}
        pi1_list.append(new_obj)
        return jsonify(pi1_list),201



if __name__=='__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=8000, debug=True)
