#!/usr/bin/env python3
# coding: utf-8

import pprint
import png
import numpy as np
from PIL import Image
import pytesseract
from re import sub
import sys

if len(sys.argv) is 1:
    print("specify filename")
    sys.exit()

pp = pprint.PrettyPrinter(indent=1)

r = png.Reader(file=open(sys.argv[1], "rb"))
# read pixels as rgba
i = r.asRGBA()
# width
w = i[0]
# height
h = i[1]
# raw pixel data
d = i[2]

print("creating pixel array...")
# convert pixels to numpy array
a = np.vstack(list(d))
# convert 2d array to 3d: [[[r, g, b, a], ...]]
p = np.reshape(a, (h, w, 4))

print("finding bottom...")
# find the bottom x-axis line of the graph
yBottom = 0
darkest = sys.maxsize
for z in range (1, 100):
    current = np.sum(p[h-z])
    if current < darkest:
        darkest = current
        yBottom = h-z

print("count x-axis...")
# count the x-axis lines (vertical)
xAxis = []
for c, x in enumerate(p[yBottom+2][55:]):
    if x[0] == 75 and x[1] == 75 and x[2] == 75:
        xAxis.append(c + 55)

print("count y-axis...")
# count the y-axis lines (horizontal)
yAxis = []
for c, x in enumerate(p[30:]):
    o = xAxis[0]-2
    if x[o][0] == 75 and x[o][0] == 75 and x[o][0] == 75:
        yAxis.append(c+30)

print("count green intersections...")
# record the location of green intersections on the vertical x-axis lines
green = []
for c in xAxis:
    for z, x in enumerate(p):
        if x[c][0] == 99 and x[c][1] == 168 and x[c][2] == 94:
            green.append([c, z])

# getLabels reads the y-axis labels
def getLabels(rows):
    labels = []
    for row in rows:
        box = []
        for z in range(0, 21):
            box.append(p[row-10+z][:xAxis[0]-6].tolist())
        boxa = np.asarray(box)
        block = Image.fromarray(boxa.astype(np.uint8))
        text = pytesseract.image_to_string(block)
        # only keep numbers 
        text = sub("\D", "", text)
        # some labels will be too hard to read, but that should be acceptable
        # if we can infer pixel position based on the other labels (linearly)
        if text is not "": 
            labels.append((row, int(text)))
    return labels

print("getting labels...\n")
pp.pprint(getLabels(yAxis))
