import { View, StyleSheet } from 'react-native';
import React from 'react';
import MyWeb from './MyWeb'


const Style=StyleSheet.create({
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20
  },
  content:{
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  }
})
function ArticlePage({ navigation, article }){
  return (
    <MyWeb url= {article.url}/>
  )
}
export default ArticlePage