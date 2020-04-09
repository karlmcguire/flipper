#!/usr/bin/env python3
# coding: utf-8

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

def clean(text):
    replace = {
        "jan": "jan",
        "yan": "jan",
        "feb": "feb",
        "mar": "mar",
        "apr": "apr",
        "may": "may",
        "jun": "jun",
        "jul": "jul",
        "aug": "aug",
        "sep": "sep",
        "oct": "oct",
        "nov": "nov",
        "now": "nov",
        "dec": "dec",
        "pec": "dec",
        "ec" : "dec",
    }

    month = text[:3]
    month = month.strip()
    month = month.lower()
    if month in replace:
        month = replace[month]

    day = text[3:]
    day = sub("\D", "", day)

    return [month, day]

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

pp.pprint(labels)
