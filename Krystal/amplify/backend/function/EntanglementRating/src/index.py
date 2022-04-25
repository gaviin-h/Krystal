
import requests

def handler(event, context=None):

	###########################
	## FUNCTIONS AND CLASSES ##
	###########################

	#####															#####
	##  DEPRECATED BUT NOT DELETED START ##
	#####															#####
	DEPTH=1
	explored=[]
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

	# Search the tree for any hits
	def dfs(root, search_ids):
		if root.has_children:
			for child in root.children:
				if child.id in search_ids:
					return [node]
				return [node]+dfs(child, search_ids)

	#####														#####
	##  DEPRECATED BUT NOT DELETED END ##
	#####														#####


	def build_list(_id):
		# if len(related)==0:
		# 	related.append(_id)
		related=[_id]
		try:
			url=f'https://littlesis.org/api/entities/{_id}/relationships'
			r=requests.get(url).json()
			for child in r['data']:
				new_id=child['attributes']['entity1_id'] if child['attributes']['entity1_id'] != _id else child['attributes']['entity2_id']
				if new_id not in related:
					related.append(new_id)
		except requests.JSONDecodeError:
			return build_list(_id)
		return related

	def get_id(_name):
		url=f'https://littlesis.org/api/entities/search?q={_name}'
		try:
			req=requests.get(url).json()
			r=req['data'][0]['id'] if len(req['data'])>0 else -1
			return r
		except Exception as e:
			print(e)
			print(url)
	
	#################
	## MAIN METHOD ## 
	#################
	root=build_list(int(event['filter_id']))
	print(f'root\n\n{root}')
	for i in root[1:10]:
		root+=build_list(i)
	root_set=set(root)
	connections={}
	# leaves=[]
	# go through current queue and resolve entities in the form {id: name}
	for i in event['articles'].split(',')[:-1]:
		# get the id of the top result and assume for now
		# maybe use the website to cross reference in the future?
		article_id=None
		while article_id==None:
			article_id=get_id(i)
		print(article_id)
		print('\n\n')
		leaf=build_list(article_id) if article_id > 0 else []
		print(f'leaf\n\n{leaf}')
		# leaves+=leaf
		if len( list(root_set.intersection(leaf)))>0:
			print(f'intersection\n\n{list(root_set.intersection(leaf))}')

			connections[i]=root[0]

	return {
    'content': connections
  }
# import json
# event=json.load(open('amplify/backend/function/EntanglementRating/src/event.json', 'r'))
# print(handler(event))
