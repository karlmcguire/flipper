#!/usr/bin/env python3
# coding: utf-8

from urllib.parse import urlparse
import chart
import json

out = {}
i = 0
with open("./data/products.json") as f:
    products = json.load(f)
    for product in products.items():
        print(i, len(products), product[0])
        product[1]["chart"] = chart.new("./charts/" + product[0] + ".png")
        out[product[0]] = product[1]
        i = i + 1

with open("out.json", "w") as f:
    json.dump(out, f)
