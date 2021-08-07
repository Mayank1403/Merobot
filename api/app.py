#%%
from flask.json import jsonify
from masked_sketch import masked_call
from flask import Flask, send_file
from flask_cors import CORS
import random
import numpy as np

from relations import part_labels
from details import add_body_parts, remove_body_parts, process
from rectangles_sketch import object_list, class_dic, rectangle_call, animals
import io
from base64 import encodebytes
from PIL import Image
# from flask import jsonify

#%%
def get_response_image(image_path):
    pil_img = Image.open(image_path, mode='r') # reads the PIL image
    byte_arr = io.BytesIO()
    pil_img.save(byte_arr, format='PNG') # convert the PIL image to byte array
    encoded_img = encodebytes(byte_arr.getvalue()).decode('ascii') # encode as base64
    return encoded_img

# %%
app = Flask(__name__)
CORS(app)
default_size = 24

rectangle_coords1 = []
labels_used = []
remaining_parts = []
masked_coord1 = []
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
    global masked_coord1
    global labels_used
    print(object)
    labels = labels_array_generator(object)
    labels = labels.reshape(1,24,1)
    rectangle_coords1, labels_used , bb= rectangle_call(object,labels,ind = 2)
    bb =  np.asarray(bb)
    masked_coord1 = masked_call(object,bb)
    print("maskedData",masked_coord1)
    print(bb.shape, type(bb))
    print(rectangle_coords1)
    get_remaining_parts(object)
    if(object in animals):
        return{
            'images': [
                'https://lh3.googleusercontent.com/_uruT_g84q8u7KxX3n072XAkhAct_9qFzQxgg5JS5ZIWdE0PZZQvd4PftgHn2Hr69kUEhvZdkQatk__l08Sjq3Hg3SZiKVIhVKL6p5vteZRp4dI6SLE_MOHEkT7VMgHdYQXKDSZDgw=w2400',
                # # 'https://lh3.googleusercontent.com/9z4NI-7aFTKmCQRBeaLSjuf8KT18wUbGmrtOJkjy1yoZ0nAeYWpixWflfplkAOA8TJDKYhgvQ-N23_orO8a-7ABrjJoO7wdx-6qT_jl2ELv6a7Y-3Km9z_06kQqqnM6iczNu-9yhnQ=w2400',
                # jsonify(send_file('rectangle.png',as_attachment=True,attachment_filename='rectangle.png',mimetype='image/png')),
                # 'https://lh3.googleusercontent.com/YoTNC0K8dgfT-d16mwuGdMqFhdiUrkw2F9YO7PCy500M3NIUB2ih0RSGeC3kANSeeqr0G7wmoqmlxC6bi6NCOpAJb3OLvAEqOBJQparfEbY4YJH8D2nC9DgORjT3oN60mkxER4sMuQ=w2400',
                "data:image/png;base64, " + get_response_image('rectangle.png'),
                "data:image/png;base64, " + get_response_image('masked.png'),
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
    global remaining_parts
    for part in all_parts:
        if part not in labels_used:
            remaining_parts.append(part)

@app.route('/open/<string:process>', methods=['GET'])
def send_process(process):
    pro = process.lower()
    if(pro=='add'):
        return{
            'model': 'line',
            'parts': remaining_parts
        }
    if(pro=='remove'):
        return{
            'model': 'line',
            'parts': labels_used
        }
    if(pro=='update'):
        return{
            'model': 'rect',
            'parts': labels_used
        }


@app.route('/process/<string:process>', methods=['GET'])
def add_coords(process):
    if(process.lower()=="update"):
        print(rectangle_coords1)
        return{'lists': rectangle_coords1}
    elif(process.lower()=="add"):
        return{'lists': masked_coord1}
    elif(process.lower()=="remove"):
        return{'lists': masked_coord1}

if(__name__ == '__main__'):
    app.run(debug=True)



# 
# %%
