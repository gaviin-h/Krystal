import React, { useState } from 'react'
import { View, StyleSheet} from 'react-native';
import FilterBubble from './FilterBubble'

export default function FilterContainer({ suggestResults, setSuggestionResults}){
  const [ currentFilters, setCurrentFilters ] = useState([])
  function addTerm(term){
    setCurrentFilters(currentFilters.concat(term))
    // setSuggestionResults(suggestResults.filter((cur) => Object.keys(cur) !== term))
  }
  function deleteTerm(term){
    setCurrentFilters(currentFilters.filter((cur) => cur !== term))
  }
  const Style = StyleSheet.create({
    container: {
      backgroundColor: 'grey',
      width: 200,
      height: 300,
      boderRadius: 20,
      marginLeft: 20,
      zIndex: -1,
    },
    bubble1: {
      backgroundColor:'green',
      height: 20,
      width: 'auto',
      borderRadius: 10,
      margin: 5
    },
    bubble2: {
      backgroundColor:'blue',
      height: 20,
      width: 'auto',
      borderRadius: 10,
      margin: 5
    }
  })
  return (
    <View style={Style.container}>
      {currentFilters? currentFilters.map((term) => 
      ( <FilterBubble 
          term={term}
          functionality={deleteTerm}
          style={Style.bubble1}
        /> )) : null}
      {suggestResults? suggestResults.map((term) => 
      ( <FilterBubble 
          term={String(Object.keys(term))}
          functionality={addTerm}
          style={Style.bubble2}
        /> )) : null}
    </View>
  )
}