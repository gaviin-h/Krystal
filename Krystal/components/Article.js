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

function Article({ article, navigation, setCurrentArticle}) {
  return (
    <TouchableOpacity 
      style={Style.container} 
      onPress={ () => {
        setCurrentArticle(article)
        navigation.navigate('articlePage')}}>
      <Text style={Style.title}>
        {article.title}
      </Text>
      <Text style={Style.author}>
        {article.author}
      </Text>
      <Text style={Style.description}>
        {article.description}
      </Text>
    </TouchableOpacity>
  )
}

export default Article