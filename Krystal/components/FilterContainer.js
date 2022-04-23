import React, { useState } from 'react'
import { StyleSheet, ScrollView} from 'react-native';
import FilterBubble from './FilterBubble'

export default function FilterContainer({ currentFilters, setCurrentFilters, suggestResults, setSuggestionResults}){
  function addTerm(term){
    setCurrentFilters(currentFilters.concat(term))
    setSuggestionResults(suggestResults.filter((cur) => cur !== term))
  }
  function deleteTerm(term){
    setCurrentFilters(currentFilters.filter((cur) => cur !== term))   
    setSuggestionResults(suggestResults.concat( term ))
  }
  const Style = StyleSheet.create({
    container: {
      backgroundColor: 'darkgrey',
      width: 350,
      height: '85%',
      boderRadius: 20,
      marginLeft: 20,
      zIndex: -1,
    },
    bubble1: {
      backgroundColor:'lightgreen',
      height: 20,
      width: 'auto',
      borderRadius: 10,
      margin: 5
    },
    bubble2: {
      backgroundColor:'lightblue',
      height: 20,
      width: 'auto',
      borderRadius: 10,
      margin: 5
    }
  })
  return (
    <ScrollView style={Style.container}>
      {currentFilters? currentFilters.map((term) => 
      ( <FilterBubble 
          term={term}
          functionality={deleteTerm}
          style={Style.bubble1}
        /> )) : null}
      {suggestResults? suggestResults.map((term) => 
      ( <FilterBubble 
          term={term}
          functionality={addTerm}
          style={Style.bubble2}
        /> )) : null}
    </ScrollView>
  )
}