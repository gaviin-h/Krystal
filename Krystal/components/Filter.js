import { View, TextInput, StyleSheet, Text} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import FilterContainer from './FilterContainer'
// import Icon from 'react-native-vector-icons/Feather';
 
  function Filter({}) {
    const [ text, setText ] = useState()
    const [ suggestResults, setSuggestResults] = useState(null)

    async function filterSet(){
      try{ 
        const url='https://v7c79w6j85.execute-api.us-west-2.amazonaws.com/dev/filtersuggest?query='+text
        fetch(url).then( response=>response.json().then( r=>{
          if(r.content !=="[Errno Expecting value] : 0"){
            setSuggestResults(r.content)
          }
        }))
      }catch (error){
        alert(error)
      }}
    return (
      <View>
        <View style={Style.container}>
          <Icon style = {Style.filter} name = 'filter' color = '#000000' size = {20} onPress={() => filterSet()}/>
          <TextInput
            style={Style.input}
            placeholder='Filter'
            onChangeText={(userInput) => {
              setText(userInput)
            }}/>
        </View>
          {suggestResults? <FilterContainer suggestResults={suggestResults} setSuggestionResults={setSuggestResults}/> : null}
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

