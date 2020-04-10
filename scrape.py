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

pytesseract.pytesseract.tesseract_cmd = "/usr/bin/tesseract-ocr"
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

def get_bottom(img):
    bottom = 0
    darkest = sys.maxsize
    for i in range(1, 100):
        current = np.sum(img[0][img[2]-i])
        if current < darkest:
            darkest = current
            bottom = img[2]-i
    return bottom

def get_lines(img, bottom):
    def get_x():
        x_lines = [] 
        for i, p in enumerate(img[0][bottom+2][55:]):
            if p[0] == 75 and p[1] == 75 and p[2] == 75:
                x_lines.append(i+55)
        return x_lines
    def get_y(x_lines):
        y_lines = []
        for i, p in enumerate(img[0][30:]):
            o = x_lines[0]-2
            if p[o][0] == 75 and p[o][1] == 75 and p[o][2] == 75:
                y_lines.append(i+30)
        return y_lines
    x = get_x()
    y = get_y(x)
    return [x, y]

def get_points(img, lines):
    points = {}
    for x in lines[0]:
        points[x] = []
        for i, p in enumerate(img[0]):
            if p[x][0] == 99 and p[x][1] == 168 and p[x][2] == 94:
                points[x].append(i)
    return points

def get_labels(img, lines):
    def get_x():
        def clean(text):
            month = 0
            day = 0
            replace = {
                    
            }
            return
        return
    def get_y():
        def clean(y_labels):
            nums = []
            difs = []
            for i, label in enumerate(y_labels):
                nums.append(label[1])
                if i != 0: difs.append(y_labels[i-1][1]-label[1])
            dif = stats.mode(difs)[0][0]
            mini = np.argmin(nums)
            if mini != len(y_labels)-1:
                print("minimum y-axis label is not at bottom, verify ok")
            start = y_labels[len(y_labels)-1][1] 
            for i, label in enumerate(y_labels):
                label[1] = start + (dif * (len(y_labels) - 1 - i))
        y_labels = []
        for y in lines[1]:
            box = []
            for i in range(0, 21):
                box.append(img[0][y-10+i][:lines[0][0]-6].tolist())
            arr = np.asarray(box)
            seg = Image.fromarray(arr.astype(np.uint8))
            text = pytesseract.image_to_string(seg)
            text = sub("\D", "", text)
            num = 0
            if text != "": num = int(text)
            y_labels.append([y, num])
        clean(y_labels)
        return y_labels
    return get_y()

def main():
    img = get_image(get_file_path())
    bottom = get_bottom(img)
    lines = get_lines(img, bottom)
    pp.pprint(get_labels(img, lines))

main()
