#%%
from flask.json import jsonify
from masked_sketch import masked_call
from flask import Flask, request
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

object_name = ''
rectangle_coords1 = []
labels_used = []
remaining_parts = []
masked_coord1 = []
labels= []
@app.route("/")
def home():
  return "<h1>Server Working</h1>"  

def labels_array_generator(object):
  list_size = object_list[object]
  diff = default_size - list_size
  global labels
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
    global object_name
    object_name = object
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

def get_all_parts_dictionary(object):
  all_parts = part_labels[object]
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


@app.route('/process/<string:process>', methods=['POST'])
def add_coords(process):
    if(process.lower()=="update"):
        print(rectangle_coords1)
        return{'lists': rectangle_coords1}
    elif(process.lower()=="add"):
        return{'lists': masked_coord1}
    elif(process.lower()=="remove"):
        return{'lists': masked_coord1}

@app.route('/<string:process>',methods=['POST'])
def update_coords(process):
    if(process.lower()=="add"):
        global labels
        # object_name = 'person'
        global object_name
        global rectangle_coords1
        global masked_coord1
        global labels_used
        data = request.get_json(force=True)
        print(data)
        all_parts = get_all_parts_dictionary(object_name)
        print(all_parts)
        # print("Purana",labels)
        label_key = all_parts[data['label_name']]
        labels[label_key-1] = np.array([1.0]).astype(float)
        labels = labels.reshape(1,24,1)
        rectangle_coords1, labels_used , bb= rectangle_call(object,labels,ind = 2)
        bb =  np.asarray(bb)
        # print("Naya",labels)
        print(label_key)
        return '1'
    if(process.lower()=="update"):
        global rectangle_coords1
        rectangle_coords1 = []
        for i in dicto:
            x = i['x']
            y = i['y']
            x1 = x + i['width']
            y1 = y + i['height']
            list1 = np.array([x, y, x1, y1])
            rectangle_coords1.append(list1)
            np.array(rectangle_coords1)

if(__name__ == '__main__'):
    app.run(debug=True)




# #call the main model wala thing
# %%
