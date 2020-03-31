#!/usr/bin/env python
# coding: utf-8

import requests
from selectorlib import Extractor
import json
import bs4 as bs
import urllib.request
import random

yaml_string = """
    title:
        css: 'h1.a-size-large span.a-size-large'
        type: Text
    price:
        css: 'td.a-span12 span.a-size-medium'
        type: Text
    rating:
        css: 'span.a-size-base span.a-size-medium'
        type: Text
    image:
        css: 'div#mars-device-upgrader-widget-v1.0 img.ucc-image'
        type: HTML
    availability:
        css: 'div.a-section.a-spacing-base span.a-size-medium'
        type: Text
    """

e = Extractor.from_yaml_string(yaml_string)
url = "https://www.amazon.com/Simple-Mobile-Prepaid-Midnight-Carrier/dp/B07XSQT4Q3/"

# create a new session with tor ip
session = requests.session()
session.proxies = {}
session.proxies["http"] = "socks5h://localhost:9050"
session.proxies["https"] = "socks5h://localhost:9050"

# get amazon page using tor
# scrape list of rotating user_agents and picks random each request
sauce = requests.get('https://developers.whatismybrowser.com/useragents/explore/software_name/chrome/')
soup = bs.BeautifulSoup(sauce.text, 'lxml')

table = soup.find('table')
table_rows = table.find_all('tr')
row = []

for tr in table_rows:
    td = tr.find_all('a')
    row.append([i.text for i in td])

row.pop(0)
user_agent = random.choice(row)
user_agent_str = " "
user_agent_str = user_agent_str.join(user_agent)
print(user_agent_str)

r = session.get(url, headers={
    "user-agent": user_agent_str
})

# extract and print
data = e.extract(r.text)
print(json.dumps(data, indent=True))
