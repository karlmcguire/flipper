#!/usr/bin/env python3
# coding: utf-8

from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from urllib.parse import urlparse
import json
import time

driver = webdriver.Chrome("/usr/local/bin/chromedriver")

with open("products.json") as json_file:
    data = json.load(json_file)
    for i, product in enumerate(data):
        asin = urlparse(product).path[9:]
        print(str(i) + "/" + str(len(data)) + ": " + asin)
        driver.get(product)
        try:
            element = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.ID, "content")))
            f = open("./pages/" + asin, "w")
            f.write(driver.page_source)
            f.close()
        finally:
            continue
