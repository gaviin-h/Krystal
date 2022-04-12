import { View, StyleSheet} from 'react-native';
import React from 'react';
import Listings from './Listings'
import Search from './Search'
import Filter from './Filter';
const Style=StyleSheet.create({
  main: {

  }
})
function Main({ search, queue, navigation, setCurrentArticle, filter}){
  return (
    <View >
      <Search search={search}/>
      <Filter filter={filter}/>
      <Listings 
        queue={queue} 
        navigation={navigation}
        setCurrentArticle={setCurrentArticle}/>
    </View>
  )
}
export default Main