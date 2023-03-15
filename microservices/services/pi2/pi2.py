import random
from flask import Flask, request, jsonify
import timeit
import os

app = Flask(__name__)


pi1_list=[

    {
        'len':0,
        'type':'Leibniz formula',
        'result':0,
        'time':0,
    }
]


@app.route('/pi2',methods=['GET','POST'])
def matrix():
    if request.method == 'GET':
        return jsonify(pi1_list),200

    if request.method == 'POST':
        new_len = request.form['len']
        start = timeit.timeit()
        n = int(new_len)
        sum = 0
        sign = 1

        # Compute the sum of the first n terms in the Leibniz series for pi/4
        for i in range(n):
            term = sign / (2*i+1)
            sum += term
            sign = -sign

        # Multiply the sum by 4 to estimate pi
        pi = 4 * sum
        end = timeit.timeit()
        new_obj = {
        'len':n,
        'type':'Leibniz formula',
        'result':pi,
        'time':end-start,}
        pi1_list.append(new_obj)
        return jsonify(pi1_list),201



if __name__=='__main__':
    port = int(os.environ.get('PORT', 8081))
    app.run(host='0.0.0.0', port=8081, debug=True)
