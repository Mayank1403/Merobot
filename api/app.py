#%%
from masked_sketch import masked_call
from flask import Flask
from flask_cors import CORS
import random
import numpy as np

from relations import part_labels
from details import add_body_parts, remove_body_parts, process
from rectangles_sketch import object_list, class_dic, rectangle_call, animals

# %%
app = Flask(__name__)
CORS(app)
default_size = 24

rectangle_coords1 = []
labels_used = []
remaining_parts = []
@app.route("/")
def home():
  return "<h1>Server Working</h1>"  

def labels_array_generator(object):
  list_size = object_list[object]
  diff = default_size - list_size
  labels = [np.array([random.randint(0, 1)]).astype(float) for i in range(list_size)]
  for _ in range(diff):
    labels.append(np.array([0.0]).astype(float))
  return np.array(labels)

def clvec_generator(object):
  clvec = []
  index_value = class_dic[object]
  for i in range(10):
    if i!= index_value:
      clvec.append(np.asarray([0.0]).astype(float))
    else:
      clvec.append(np.asarray([1.0]).astype(float))
  return np.asarray(clvec)


@app.route('/images/<string:object>', methods=['GET'])
def send_images(object):
    object = object.lower()
    global rectangle_coords1
    global labels_used
    print(object)
    labels = labels_array_generator(object)
    labels = labels.reshape(1,24,1)
    rectangle_coords1, labels_used , bb= rectangle_call(object,labels,ind = 2)
    bb =  np.asarray(bb)
    maskedData = masked_call(object,bb)
    print("maskedData",maskedData)
    print(bb.shape, type(bb))
    print(rectangle_coords1)
    global remaing_parts
    remaing_parts = get_remaining_parts(object)
    print(remaing_parts)
    if(object in animals):
        return{
            'images': [
                'https://lh3.googleusercontent.com/_uruT_g84q8u7KxX3n072XAkhAct_9qFzQxgg5JS5ZIWdE0PZZQvd4PftgHn2Hr69kUEhvZdkQatk__l08Sjq3Hg3SZiKVIhVKL6p5vteZRp4dI6SLE_MOHEkT7VMgHdYQXKDSZDgw=w2400',
                'https://lh3.googleusercontent.com/9z4NI-7aFTKmCQRBeaLSjuf8KT18wUbGmrtOJkjy1yoZ0nAeYWpixWflfplkAOA8TJDKYhgvQ-N23_orO8a-7ABrjJoO7wdx-6qT_jl2ELv6a7Y-3Km9z_06kQqqnM6iczNu-9yhnQ=w2400',
                'https://lh3.googleusercontent.com/YoTNC0K8dgfT-d16mwuGdMqFhdiUrkw2F9YO7PCy500M3NIUB2ih0RSGeC3kANSeeqr0G7wmoqmlxC6bi6NCOpAJb3OLvAEqOBJQparfEbY4YJH8D2nC9DgORjT3oN60mkxER4sMuQ=w2400',
            ],
            'process': process
        }
    else:
        return {"images" : [], "process" : []}

################
#later
# @app.route('/images/<string:object>', methods=['GET'])
# def send_images(object):
#   print(object)
#   # list_size = object_list[object]
#   labels = labels_array_generator(object)
#   labels = labels.reshape(1,24,1)
#   rectangle_call(object,labels,ind = 2)
#   return '<h1>Ho Gaya Khatam</h1>'
#################

#get list of all parts
def get_all_parts(object):
  all_parts = list(part_labels[object].keys())
  return all_parts

#get all the parts that are not included in the image
def get_remaining_parts(object):
    all_parts = get_all_parts(object)
    remaining_parts = []
    for part in all_parts:
        if part not in labels_used:
            remaining_parts.append(part)
    return remaining_parts

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
    if(pro=='update'):
        return{
            'model': 'rect',
            'parts': remove_body_parts
        }


@app.route('/process/<string:process>', methods=['GET'])
def add_coords(process):
    if(process.lower()=="update"):
        print(rectangle_coords1)
        return{'lists': rectangle_coords1}
    elif(process.lower()=="add"):
        return{'lists': []}
    elif(process.lower()=="remove"):
        return{'lists': []}

if(__name__ == '__main__'):
    app.run(debug=True)