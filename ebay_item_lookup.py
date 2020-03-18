import requests
import json
import csv

sandbox_key = "DevanNes-Flipper-SBX-069ec6ae1-ff76d76b"
production_key = "DevanNes-Flipper-PRD-e69ec6b8e-da89c70e"

# Search parameters
search = "android"
maxPrice = "10.00"

# Returns a list of titles
def getTitle(data):
    titles = [item["title"] for item in data]      
    return titles

# Returns a list of prices
def getPrice(data):
    prices = [item['sellingStatus'][0]['convertedCurrentPrice'][0]['__value__'] for item in data]
    return prices

# Returns a list of urls
def getURL(data):
    urls = [item["viewItemURL"] for item in data]
    return urls

# Returns a list of IDs
def getId(data):
    itemId = [item["itemId"] for item in data]
    return itemId

# Returns a list of image URLs
def getImage(data):
    itemImage = [item["galleryURL"] for item in data]
    return itemImage

# Stores information into a csv file
def writeToFile(ids, titles, urls, prices):
    with open('ebayList.csv', 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['ItemID', 'Title','Price', 'URL'])
        for itemID, title, url, price in zip(ids, titles, urls, prices):
            row = [itemID[0], title[0], price, url[0]]
            writer.writerow(row)


def main():
    url = ('https://svcs.ebay.com/services/search/FindingService/v1\
?OPERATION-NAME=findItemsByKeywords\
&SERVICE-VERSION=1.0.0\
&SECURITY-APPNAME=' + production_key + '\
&RESPONSE-DATA-FORMAT=JSON\
&REST-PAYLOAD\
&itemFilter(0).name=Condition\
&itemFilter(0).value=New\
&itemFilter(1).name=MaxPrice\
&itemFilter(1).value=' + maxPrice + '\
&itemFilter(1).paramName=Currency\
&itemFilter(1).paramValue=USD\
&keywords=' + search)
    apiResult = requests.get(url)
    parsedResult = apiResult.json()
    #print(parsedResult)
    data = parsedResult["findItemsByKeywordsResponse"][0]["searchResult"][0]["item"]

    writeToFile(getId(data), getTitle(data), getURL(data), getPrice(data))

# Entry point
if __name__ == "__main__":
    main()
