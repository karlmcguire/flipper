#!/usr/bin/python3.7
# coding: utf-8

import pprint
import png
import numpy as np
from PIL import Image
import pytesseract
from re import sub
import sys

pp = pprint.PrettyPrinter(indent=1)

r = png.Reader(file=open("./data/data_4.png", "rb"))
i = r.asRGBA()
w = i[0]
h = i[1]
d = i[2]
print(w, h)

a = np.vstack(list(d))
p = np.reshape(a, (h, w, 4))

# find the bottom x-axis line of the graph
yBottom = 0
darkest = sys.maxsize
for z in range (1, 100):
    current = np.sum(p[h-z])
    if current < darkest:
        darkest = current
        yBottom = h-z

# count the x-axis lines (vertical)
xAxis = []
for c, x in enumerate(p[yBottom+2][55:]):
    if x[0] == 75 and x[1] == 75 and x[2] == 75:
        xAxis.append(c + 55)

# count the y-axis lines (horizontal)
yAxis = []
for c, x in enumerate(p[30:]):
    o = xAxis[0]-2
    if x[o][0] == 75 and x[o][0] == 75 and x[o][0] == 75:
        yAxis.append(c+30)

# record the location of green intersections on the vertical x-axis lines
green = []
for c in xAxis:
    for z, x in enumerate(p):
        if x[c][0] == 99 and x[c][1] == 168 and x[c][2] == 94:
            green.append([c, z])

def getLabels(rows):
    labels = []
    for row in rows:
        box = []
        for z in range(0, 21):
            box.append(p[row-10+z][:xAxis[0]-6].tolist())
        boxa = np.asarray(box)
        block = Image.fromarray(boxa.astype(np.uint8))
        text = pytesseract.image_to_string(block)
        text = sub("\D", "", text)
        labels.append((row, text))
        #labels.append((row, int(text)))
    return labels

pp.pprint(getLabels(yAxis))
