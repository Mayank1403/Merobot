from flask import Flask
from flask_cors import CORS

from details import add_body_parts, remove_body_parts


app = Flask(__name__)
CORS(app)

@app.route('/images/<string:object>', methods=['GET'])
def send_images(object):
    if(object.lower()=='cow'):
        return{
            'images': [
                {"src" : 'https://lh3.googleusercontent.com/_uruT_g84q8u7KxX3n072XAkhAct_9qFzQxgg5JS5ZIWdE0PZZQvd4PftgHn2Hr69kUEhvZdkQatk__l08Sjq3Hg3SZiKVIhVKL6p5vteZRp4dI6SLE_MOHEkT7VMgHdYQXKDSZDgw=w2400',
                "model": ''},
                {"src" : 'https://lh3.googleusercontent.com/9z4NI-7aFTKmCQRBeaLSjuf8KT18wUbGmrtOJkjy1yoZ0nAeYWpixWflfplkAOA8TJDKYhgvQ-N23_orO8a-7ABrjJoO7wdx-6qT_jl2ELv6a7Y-3Km9z_06kQqqnM6iczNu-9yhnQ=w2400',
                "model": 'rect'},
                {"src" : 'https://lh3.googleusercontent.com/YoTNC0K8dgfT-d16mwuGdMqFhdiUrkw2F9YO7PCy500M3NIUB2ih0RSGeC3kANSeeqr0G7wmoqmlxC6bi6NCOpAJb3OLvAEqOBJQparfEbY4YJH8D2nC9DgORjT3oN60mkxER4sMuQ=w2400',
                "model": 'line'}
            ]
        }

@app.route('/open/<string:process>', methods=['GET'])
def send_process(process):
    pro = process.lower()
    if(pro=='add'):
        return{
            'model': 'line',
            'parts': add_body_parts
        }
    if(pro=='remove'):
        return{
            'model': 'line',
            'parts': remove_body_parts
        }
    if(pro=='manipulate'):
        return{
            'model': 'rect',
            'parts': remove_body_parts
        }


@app.route('/add', methods=['GET'])
def add_coords():
    return{'lists':[
    {
        'height': 97,
        'key': 1,
        'stroke': "#b82828",
        'strokeWidth': 5,
        'width': 166,
        'x': 158.046875,
        'y': 145.453125,
        'label': 'torso',
    },
    {
        'height': 71,
        'key': 2,
        'stroke': "#a728b8",
        'strokeWidth': 5,
        'width': 65,
        'x': 314.046875,
        'y': 185.453125,
        'label': 'head',
    },
    {
        'height': 19,
        'key': 3,
        'stroke': "#4828b8",
        'strokeWidth': 5,
        'width': 62,
        'x': 107.046875,
        'y': 203.453125,
        'label': 'tail',
    },
    {
        'height': 77,
        'key': 4,
        'stroke': "#28b867",
        'strokeWidth': 5,
        'width': 26,
        'x': 178.046875,
        'y': 234.453125,
        'label': 'leg',
    }
    ]}

if(__name__ == '__main__'):
    app.run(debug=True)