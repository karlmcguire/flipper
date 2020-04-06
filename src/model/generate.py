#!/usr/bin/env python3

import sys
from essential_generators import DocumentGenerator

# template for items (without price data -- still working on that)
item = {
    "id": "guid",
    "name": "sentence",
    "desc": "paragraph",
    "price": "small_int",
    "lastPrice": "small_int",
    "img": "https://i.imgur.com/wAgpEhJ.png"
}

gen = DocumentGenerator()
gen.set_template(item)

# print to javascript format, for appending to items.js
for doc in gen.documents(24):
    print("items.set(\"" + doc["id"] + "\", " + str(doc) + ")")
