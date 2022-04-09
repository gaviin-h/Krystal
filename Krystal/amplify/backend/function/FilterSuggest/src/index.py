def handler(event, context):
    import requests
    q=event['query']
    TAGS=['anti-choice', 'anti-gender', 'anti-transgender', 'australia', 'boston', 'buffalo', 'coronavirus', 'corporate-mapping-project', 'defence', 'finance', 'florida', 'fracking', 'georgia', 'hindutva', 'iapd', 'icecontractor', 'louisiana', 'massachusetts', 'méxico', 'michigan', 'migrantjustice', 'nys', 'philly', 'PIC', 'prosecutor', 'puerto-rico', 'raleigh', 'real-estate', 'san-diego', 'seditioncaucus', 'st.-louis', 'tech', 'virginia']
    tags=f'&tags={q}' if q in TAGS else ''
    
    url = 'https://littlesis.org/api/entities/search?q='+q+tags
        
    try: 
        response = requests.get(url).json()
        r=[]
        for item in response['data']:
            if item['attributes']['parent_id'] is None or len(r)==0:
                r.append( {item['attributes']['name']: (item['attributes']['id'], item['attributes']['aliases'])} ) 

    except Exception as e:
        r=str(e)
    return {
        "content" : r
  }