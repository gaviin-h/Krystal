import { TouchableOpacity, Text, StyleSheet} from 'react-native';
import React from 'react';

const Style=StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5
  },
  author: {
    fontWeight: '300'
  },
  description: {
    marginLeft: 20
  },
  container: {
    borderColor: 'grey',
    borderRadius: 10,
    borderWidth: 2,
    padding: 15,
    margin: 5,
  }

})

function Article({ title, author, description, navigation, key}) {
  return (
    <TouchableOpacity style={Style.container} onPress={navigation.navigate('article'+key)}>
      <Text style={Style.title}>
        {title}
      </Text>
      <Text style={Style.author}>
        {author}
      </Text>
      <Text style={Style.description}>
        {description}
      </Text>
    </TouchableOpacity>
  )
}

export default Article