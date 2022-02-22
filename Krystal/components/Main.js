import { View, StyleSheet} from 'react-native';
import React from 'react';
import Listings from './Listings'
import Search from './Search'
const Style=StyleSheet.create({
  main: {

  }
})
function Main({ search, queue, navigation, setCurrentArticle}){
  return (
    <View >
      <Search search={search}/>
      <Listings 
        queue={queue} 
        navigation={navigation}
        setCurrentArticle={setCurrentArticle}/>
    </View>

  )
}
export default Main