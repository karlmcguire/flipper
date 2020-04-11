#!/usr/bin/env python3
# coding: utf-8

import json

print("const items = new Map()")

with open("./data/products_charts.json") as f:
    data = json.load(f)
    for product in data.items():
        print("items.set(\""+product[0]+"\", "+json.dumps(product[1]) + ")")

print("export default items")
