#!/usr/bin/env python3
# coding: utf-8

import png
import sys
import random
import pprint
import numpy as np
import pytesseract
from PIL import Image
from re import sub
from scipy import stats

pytesseract.pytesseract.tesseract_cmd = "/usr/local/bin/tesseract"
pp = pprint.PrettyPrinter(indent=1)

def get_file_path():
    if len(sys.argv) == 1:
        sys.exit("2nd argument must be chart file path")
    return sys.argv[1]

def get_image(path):
    read = png.Reader(file=open(path, "rb"))
    img = read.asRGBA()
    width = img[0]
    height = img[1]
    data = img[2]
    return [np.reshape(np.vstack(list(data)), (height, width, 4)),
            width,
            height]

def find_bottom(img)
    bottom = 0
    darkest = sys.maxsize
    for i in range(1, 100):
        current = np.sum(pixels[height-i])
        if current < darkest:
            darkest = current
            bottom = height - i

def main():

main()
