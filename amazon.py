#!/usr/bin/env python
# coding: utf-8

import requests
from selectorlib import Extractor
import json


e = Extractor.from_yaml_file("amazon.yml")

url = "https://www.amazon.com/Rolex-Datejust-Mechanical-Automatic-Certified/dp/B015MXYTAQ/"

r = requests.get(url, {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"
})

data = e.extract(r.text)
print(json.dumps(data, indent=True))
