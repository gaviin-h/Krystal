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
			for child in r['data'][:10]:
				new_id=child['attributes']['entity1_id'] if child['attributes']['entity1_id'] != old_node.id else child['attributes']['entity2_id']
				if new_id not in explored: ## and check if explored
					old_node.add_child(new_id)
					if depth<DEPTH:
						build_tree(old_node.children[-1], depth+1)## here?

			return old_node
		except Exception as e:
			# maybe try to implement logging here
			print(e)

	def build_list(filter_id):
		related=[filter_id]
		url=f'https://littlesis.org/api/entities/{filter_id}/relationships'
		r=requests.get(url).json()
		for child in r['data']:
			new_id=child['attributes']['entity1_id'] if child['attributes']['entity1_id'] != filter_id else child['attributes']['entity2_id']
			if new_id not in related:
				related.append(new_id)

		return related
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
	root=build_list(int(event['filter_id']))
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
	connections={}
	for i in entities:
		if i in root:
			connections[entities[i]]=root[0]
	# print(root.id)
	# print(root.list_children())
	# print('\n')
	# for child in root.children:
	# 	print(child.id)
	# 	print(child.list_children())
	# 	print('\n')
	# path=dfs(root, entities)

	return {
    'content': connections
  }

event=json.load(open('amplify/backend/function/EntanglementRating/src/event.json', 'r'))
print(handler(event))