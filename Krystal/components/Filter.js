import { View, TextInput, StyleSheet, Text} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import FilterContainer from './FilterContainer'
// import Icon from 'react-native-vector-icons/Feather';
 
  function Filter({}) {
    const [ text, setText ] = useState()
    const [ suggestResults, setSuggestResults] = useState(null)
    var TO
    return (
      <View >
        <Icon style = {Style.random} name = 'filter' color = '#000000' size = {20}/>
        <TextInput
          style={Style.container}
          placeholder='Filter'
          onChangeText={(userInput) => {
            setText(userInput)
            clearTimeout(TO)
            TO=setTimeout(() => {
              try{ 
                const url='https://v7c79w6j85.execute-api.us-west-2.amazonaws.com/dev/filtersuggest?query='+text
                fetch(url).then( response=>response.json().then( r=>{
                  console.log(Object.keys(r.content))
                  // setSuggestResults(r.content)
                }))
              }catch (error){
                alert(error)
              }
            }, 3000)
          }}/>
          {suggestResults? <FilterContainer suggestResults={suggestResults}/> : null}
        
      </View>
    )
  }
 
 
  const Style=StyleSheet.create({
    container: {
      width: '50%',
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderColor: 'white',
      borderRadius: 10,
      paddingLeft: 28
    },
    random: {
        top: 43,
        left: 20
    }
  })
 
  export default Filter;

