import numpy as np

cc_list = ['cow','sheep','bird','person','cat','dog','horse','aeroplane','motorbike','bicycle']
def cc_generator(object):
    cc = np.zeros((1,10))
    for i in range(10):
        if object == cc_list[i]:
            cc[0,i] = 1
    return cc

cc = np.asarray([[0., 0., 0., 0., 0., 0., 0., 1., 0., 0.]])

print(cc_generator('aeroplane'), cc_generator('aeroplane').shape)
print(cc, cc.shape)