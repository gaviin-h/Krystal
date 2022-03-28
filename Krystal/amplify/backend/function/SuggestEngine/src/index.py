

def handler(event, context):    
    import requests

    url = ('https://newsapi.org/v2/everything?'
       'q='+ event['body']['term'] +'&'
       'from=2022-03-26&'
       'sortBy=popularity&'
       'apiKey=c86e67c82f1e44e29fb5dd30095fb55b')

    response = requests.get(url)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': response.json()
  }