#!/usr/bin/env python3
# coding: utf-8

import random
import pprint
import png
import numpy as np
from PIL import Image
import pytesseract
from re import sub
import sys
from scipy import stats

# set this to the location of your tesseract-ocr binary (depends on os)
pytesseract.pytesseract.tesseract_cmd = "/usr/local/bin/tesseract"

if len(sys.argv) == 1:
    print("specify filename")
    sys.exit()

# for debugging purposes
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

# convert pixels to numpy array
a = np.vstack(list(d))
# convert 2d array to 3d: [[[r, g, b, a], ...]]
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

# cleans month and day strings
def clean(text):
    m, d = 0, 0
    replace = {
        "jan": 1,
        "yan": 1,
        "feb": 2,
        "mar": 3,
        "apr": 4,
        "ape": 4,
        "may": 5,
        "jun": 6,
        "jul": 7,
        "jus": 7,
        "aug": 8,
        "sep": 9,
        "oct": 10,
        "ott": 10,
        "nov": 11,
        "now": 11,
        "dec": 12,
        "pec": 12,
        "ec" : 12,
    }
    month = text[:3]
    month = month.strip()
    month = month.lower()
    if month in replace:
        m = replace[month]
    day = text[3:]
    day = sub("\D", "", day)
    if day == "":
        d = random.randint(10, 25)
    else:
        d = int(day)
    return [m, d]

width = 40
height = 35
yOffset = 6
xOffset = -33

labels = []
for label in xAxis:
    box = []
    for z in range(0, height):
        box.append(p[yBottom+yOffset+z]
                    [label+xOffset:label+xOffset+width].tolist())
    boxa = np.asarray(box)
    img = Image.fromarray(boxa.astype(np.uint8))
    img = img.rotate(-45, resample=Image.BICUBIC, expand=True)
    text = pytesseract.image_to_string(img)
    labels.append(clean(text))

# add year, more cleaning
year = 2019
stamps = []
for z, label in enumerate(labels):
    stamps.append([year, label])
    if z != len(labels) - 1:
        if labels[z+1][0] < labels[z][0]:
            year = year + 1

pp.pprint(stamps)
