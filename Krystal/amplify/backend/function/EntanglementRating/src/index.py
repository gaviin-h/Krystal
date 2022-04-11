import json
import requests

def handler(event, context=None):
	DEPTH=1
	explored=[]
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
			return len(self.children)!=0
		def list_children(self):
			lst=[]
			for child in self.children:
				lst.append(child.id)
			return lst

	# Build a search tree from the endpoint
	def build_tree(old_node, depth=0):
			# limit the relationships to specific category by including the param "category_id"
		explored.append(old_node.id)
		try:
			url=f'https://littlesis.org/api/entities/{old_node.id}/relationships'
			r=requests.get(url).json()
			for c,child in enumerate(r['data']):
				if depth<DEPTH and c<10 and child['attributes']['entity1_id'] not in explored: ## and check if explored
					old_node.add_child(child['attributes']['entity1_id'])
					build_tree(old_node.children[-1], depth+1)

			return old_node
		except Exception as e:
			# maybe try to implement logging here
			print(e)

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
	root=build_tree(node(int(event['filter_id']), None))
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
	print(root.id)
	print(root.list_children())
	print('\n')
	for child in root.children:
		print(child.id)
		print(child.list_children())
		print('\n')
	# path=dfs(root, entities)

	return {
    'content': path
  }

event=json.load(open('amplify/backend/function/EntanglementRating/src/event.json', 'r'))
print(handler(event))