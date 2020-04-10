#!/usr/bin/env python3
# coding: utf-8

from selectorlib import Extractor
from urllib.parse import urlparse
import requests 
import json 

def get_url(page):
    return "https://camelcamelcamel.com/popular?bn=electronics&deal=0&p=" + str(page)

links = []

for i in range(0, 10):
    r = requests.get(get_url(i), headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"})
    e = Extractor.from_yaml_file("./templates/products.yml")
    data = e.extract(r.text)
    links.extend(data["link"])

print(json.dumps(links, indent=True))
