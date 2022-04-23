import { View, TextInput, StyleSheet} from 'react-native';
import React, { useState,useEffect } from 'react';
import FilterContainer from './FilterContainer'
 
  function Filter({currentFilters, setCurrentFilters, navigation}) {
    const [ text, setText ] = useState()
    const [ suggestResults, setSuggestResults] = useState([])
    const [ oldText, setOldText ] = useState('')
    useEffect(() => {
      let isCancelled=false
      setTimeout(() => {
        if(text!=='' && !isCancelled && oldText!==text){
          setOldText(text)
          try{ 
            const url='https://v7c79w6j85.execute-api.us-west-2.amazonaws.com/dev/filtersuggest?query='+text
            console.log(url)
            fetch(url).then( response=>response.json().then( r=>{
              console.log(r.content)
              setSuggestResults(r.content)
              console.log(Object.keys(r.content))
            }))
          }catch (error){
            console.log(error)
          }}
      }, 3000)
      
      return () => {
        isCancelled = true
      }})
    return (
      <View>
        <View style={Style.container}>
          <TextInput
            style={Style.input}
            placeholder='Filter'
            onChangeText={(userInput) => {
              setText(userInput)
            }}
            />
        </View>
          {suggestResults ? 
            <FilterContainer 
              suggestResults={suggestResults} 
              setSuggestionResults={setSuggestResults}
              currentFilters={currentFilters}
              setCurrentFilters={setCurrentFilters}/> : null}
      </View>
    )
  }
 
 
  const Style=StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row'
    },
    input:{
      width: '50%',
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderColor: 'white',
      borderRadius: 10,
      paddingLeft: 28
    },
    filter: {
      display: 'flex',
      top: 20,
      marginLeft: 3
    },
    box: {
      
    }
  })
 
  export default Filter;

