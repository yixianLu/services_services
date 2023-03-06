import numpy as np
from flask import Flask, request, jsonify
import timeit

app = Flask(__name__)

matrix_list=[

    {
        'width':0,
        'result':0,
        'time':0,
    }
]

@app.route('/matrix',methods=['GET','POST'])
def matrix():
    if request.method == 'GET':
        return jsonify(matrix_list),200
    

    if request.method == 'POST':
        new_width = request.form['width']
        
        start = timeit.timeit()
        # Generate a large matrix
        matrix_size = int(new_width)
        matrix = np.random.rand(matrix_size, matrix_size)

        # Compute the eigenvalues of the matrix using NumPy's eig function
        eigenvalues = np.linalg.eig(matrix)

        # Sum the eigenvalues
        sum_of_eigenvalues = sum(eigenvalues[0])
        end = timeit.timeit()
        result = sum_of_eigenvalues.item()

        new_obj = {
        'width':new_width,
        'result':result.real,
        'time':end-start,}
        matrix_list.append(new_obj)
        return jsonify(matrix_list),201

if __name__=='__main__':
    app.run()
