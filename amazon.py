#!/usr/bin/env python
# coding: utf-8

import requests
from selectorlib import Extractor
import json

e = Extractor.from_yaml_file("amazon.yml")
url = "https://www.amazon.com/Simple-Mobile-Prepaid-Midnight-Carrier/dp/B07XSQT4Q3/"

# create a new session with tor ip
session = requests.session()
session.proxies = {}
session.proxies["http"] = "socks5h://localhost:9050"
session.proxies["https"] = "socks5h://localhost:9050"

# get amazon page using tor
r = session.get(url, headers={
    "user-agent": "Mozilla/5.0 (iPad; CPU OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13G36"
})

# extract and print
data = e.extract(r.text)
print(json.dumps(data, indent=True))
