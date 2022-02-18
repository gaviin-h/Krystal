import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Style=StyleSheet.create({
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20
  },
  content:{
    padding: 20,
    marginTop: 20
  }
})
function ArticlePage({ navigation, article }){
  return (
    <View>
      <Text style={Style.title} >{article.title}</Text>
      <Text style={Style.content}>{article.content} </Text>
    </View>
  )
}

export default ArticlePage