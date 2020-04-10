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

# you will most likely have to change this value to point to the tesseract* 
# binary on your system
pytesseract.pytesseract.tesseract_cmd = "/usr/bin/tesseract-ocr"

# get_file_path returns the second commandline argument, which should be the
# path to the chart png
#
# for example, ./scrape.py charts/chart.png
def get_file_path():
    if len(sys.argv) == 1:
        sys.exit("2nd argument must be chart file path")
    return sys.argv[1]

# get_image reads the png file from disk and returns pixel data, width, and 
# height
def get_image(path):
    read = png.Reader(file=open(path, "rb"))
    img = read.asRGBA()
    width = img[0]
    height = img[1]
    data = img[2]
    return [np.reshape(np.vstack(list(data)), (height, width, 4)),
            width,

# get_bottom takes an img parameter (returned by get_image) and returns the
# y-pixel value of the bottom chart border (above axis labels)
def get_bottom(img):
    bottom = 0
    darkest = sys.maxsize
    for i in range(1, 100):
        current = np.sum(img[0][img[2]-i])
        if current < darkest:
            darkest = current
            bottom = img[2]-i
    return bottom

# get_lines takes an img and bottom parameter and returns the locations of the
# x-axis and y-axis gridlines (gray)
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

# get_points takes an img and lines parameter and returns a dictionary where
# keys are x-axis locations and values are green pixels on that vertical line
#
# because there can be a lot of pixels on the vertical line, the dictionary
# makes it easier for deriving the accurate point position on the graph (by 
# choosing the median point, for example - not sure yet)
def get_points(img, lines):
    points = {}
    for x in lines[0]:
        points[x] = []
        for i, p in enumerate(img[0]):
            if p[x][0] == 99 and p[x][1] == 168 and p[x][2] == 94:
                points[x].append(i)
    return points

# get_labels takes an img, bottom, and lines parameter and returns the labels
# of the x-axis and y-axis
def get_labels(img, bottom, lines):
    def get_x():
        def clean(text):
            m, d = 0, 0
            replace = {
                "jan": 1,
                "yan": 1,
                "feb": 2,
                "mar": 3,
                "apr": 4,
                "a3" : 4,
                "ape": 4,
                "may": 5,
                "wma": 5,
                "jun": 6,
                "jon": 6,
                "jul": 7,
                "30" : 7,
                "u2s": 7,
                "s"  : 7,
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
            day = text[3:]
            day = sub("\D", "", day)
            if day == "": d = random.randint(10, 25)
            else: d = int(day)
            month = text[:3]
            month = month.strip()
            month = month.lower()
            if month in replace:
                m = replace[month]
            else:
                print("month '" + month + "' not found with day " + str(d))
            return [m, d]
        width = 40
        height = 35
        x_offset = -33
        y_offset = 6
        d_labels = []
        for x in lines[0]:
            box = []
            for i in range(0, height):
                box.append(img[0]
                           [bottom + y_offset + i]
                           [x + x_offset : x + x_offset + width].tolist())
            arr = np.asarray(box) 
            seg = Image.fromarray(arr.astype(np.uint8))
            seg = seg.rotate(-45, resample=Image.BICUBIC, expand=True)
            text = pytesseract.image_to_string(seg)
            d_labels.append(clean(text))
        year = 2019
        x_labels = []
        for i, label in enumerate(d_labels):
            x_labels.append([year, label[0], label[1]])
            if i != len(d_labels) - 1:
                if d_labels[i+1][0] < label[0]:
                    year = year + 1
        return x_labels
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
    return [get_x(), get_y()]
