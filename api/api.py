from flask import Flask

app = Flask(__name__)

@app.route('/api', methods=['GET'])
def index():
    return{'lists':[
    {
        'height': 97,
        'key': 1,
        'stroke': "#b82828",
        'strokeWidth': 5,
        'width': 166,
        'x': 158.046875,
        'y': 145.453125
    },
    {
        'height': 71,
        'key': 2,
        'stroke': "#a728b8",
        'strokeWidth': 5,
        'width': 65,
        'x': 314.046875,
        'y': 185.453125
    },
    {
        'height': 19,
        'key': 3,
        'stroke': "#4828b8",
        'strokeWidth': 5,
        'width': 62,
        'x': 107.046875,
        'y': 203.453125
    },
    {
        'height': 77,
        'key': 4,
        'stroke': "#28b867",
        'strokeWidth': 5,
        'width': 26,
        'x': 178.046875,
        'y': 234.453125
    }
    ]}

if(__name__ == '__main__'):
    app.run(debug=True)