import React, { useState } from 'react'
import { View, StyleSheet} from 'react-native';
import FilterBubble from './FilterBubble'

export default function FilterContainer({ suggestResults}){
  const [ currentFilters, setCurrentFilters ] = useState(null)
  function addTerm(term){
    setCurrentFilters(currentFilters+[term])
    suggestResults=suggestResults.filter(cur => cur !== term)
  }
  function deleteTerm(term){
    setCurrentFilters(currentFilters.filter(cur => cur !== term))
  }
  const Style = StyleSheet.create({
    container: {
      backgroundColor: 'grey',
      width: 200,
      height: 300,
      boderRadius: 20
    }
  })
  return (
    <View style={Style.container}>
      {currentFilters? currentFilters.map((term) => 
      ( <FilterBubble 
          term={term}
          addTerm={addTerm}
          // deleteTerm={deleteTerm}
        /> )) : null}
      {suggestResults? suggestResults.map((term) => 
      ( <FilterBubble 
          term={term}
          addTerm={addTerm}
        /> )) : null}
    </View>
  )
}