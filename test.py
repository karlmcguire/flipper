#!/usr/bin/env python3
# coding: utf-8

import png
import pytesseract
from PIL import Image
import numpy as np

pytesseract.pytesseract.tesseract_cmd = "/usr/bin/tesseract-ocr"

r = png.Reader(file=open("./data/3.png", "rb"))
i = r.asRGBA()
w = i[0]
h = i[1]
d = i[2]

a = np.vstack(list(d))
p = np.reshape(a, (h, w, 4))

block = Image.fromarray(p.astype(np.uint8))
text = pytesseract.image_to_string(block)

print(text)
