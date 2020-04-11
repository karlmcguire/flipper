#!/usr/bin/env python3
# coding: utf-8

from urllib.parse import urlparse
from fake_useragent import UserAgent
import requests
import shutil
import json
import time

ua = UserAgent()

def get_url(asin):
    return "https://charts.camelcamelcamel.com/us/" + asin + "/amazon.png?force=1&zero=0&w=855&h=513&desired=false&legend=1&ilt=1&tp=1y&fo=0&lang=en"

with open("./data/pages.json") as json_file:
    data = json.load(json_file)
    for i, product in enumerate(data):
        asin = urlparse(product).path[9:]
        print(str(i) + "/" + str(len(data)) + ": " + asin)
        r = requests.get(get_url(asin), 
                         headers={"user-agent": ua.random}, stream=True)
        with open("./charts/" + asin + ".png", "wb") as chart:
            shutil.copyfileobj(r.raw, chart)
