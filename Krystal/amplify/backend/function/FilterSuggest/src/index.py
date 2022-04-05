import json
import requests

def handler(event, context):
    url = ('https://littlesis.org/api/'+
       'entities/search?q='+ event['query'] 
    )

    response = requests.get(url).json()
    r=[]
    for i in response['data']:
        r.append({i['attributes']['name']: i['id']})

    return {
        "content" : r
  }