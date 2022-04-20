
import json
import requests

def handler(event, context):
  DEPTH=3
  ###########################
  ## FUNCTIONS AND CLASSES ##
  ###########################
  # Class for entities 
  class node:
    def __init__(self, id, parent, name=None):
        self.name=name
        self.id=id
        self.parent=parent
    children=[]
    def add_child(self, id, name=None):
      self.children.append(node(id, self, name))
    def has_children(self):
      return len(self.children)>0
      
  # Build a search tree from the endpoint
  def build_tree(old_node, depth=0):
      # limit the relationships to specific category by including the param "category_id"
    url=f'https://littlesis.org/api/entities/{old_node.id}/relationships'
    try:
      r=requests.get(url).json()
    except Exception as e:
      # maybe try to implement logging here
      print(e)
    for child in r['data']:
      old_node.add_child(child['attributes']['entity1_id'])
      if depth<DEPTH:
        build_tree(old_node[-1], depth+1)
    return old_node

  # Search the tree for any hits
  def dfs(root, search_ids):
    if root.has_children:
      for child in root.children:
        if child.id in search_ids:
          return [node]
        return [node]+dfs(child, search_ids)

  #################
  ## MAIN METHOD ## 
  #################
  root=build_tree(node(event['filter_id'], None))
  entities={}
  # go through current queue and resolve entities in the form {id: name}
  for i in event['articles']:
    # get the id of the top result and assume for now
    # maybe use the website to cross reference in the future?
    try:
      response = requests.get('https://littlesis.org/api/entities/search?q='+i).json()
      entities[response['data'][0]['id']]=i
    except Exception as e:
      # log?
      print(e)
  
  path=dfs(root, entities)

  return {
    'content': path
  }
