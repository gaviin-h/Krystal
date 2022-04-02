

def handler(event, context):    
    import requests
    import json
    
    url = ('https://newsapi.org/v2/everything?'
       'q='+ event['country'] +'&'
       'from=2022-03-26&'
       'sortBy=popularity&'
       'apiKey=c86e67c82f1e44e29fb5dd30095fb55b')

    response = requests.get(url)
    return {
        "content" : response.json()
  }