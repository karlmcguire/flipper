#!/usr/bin/env python3
# coding: utf-8

from selectorlib import Extractor
from urllib.parse import urlparse
from fake_useragent import UserAgent
import requests
import json
import time
import sys

products = {}

with open("products.json") as json_file:
    data = json.load(json_file)
    for i, product in enumerate(data):
        asin = urlparse(product).path[9:]
        #print(str(i) + "/" + str(len(data)) + ": " + asin)
        with open("./pages/" + asin) as html:
            e = Extractor.from_yaml_file("./templates/product.yml")
            d = e.extract(html.read())
            products[asin] = d

print(json.dumps(products, indent=True))
