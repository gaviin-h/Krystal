import { View, TextInput, StyleSheet, Text} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/Feather';
 
  function SearchFilter({}) {
    const [ text, setText ] = useState()
    return (
      <View >
          <Icon style = {Style.random} name = 'filter' color = '#000000' size = {20}/>
        <TextInput
          style={Style.container}
          placeholder='Filter'
          onChangeText={(userInput) => setText(userInput)}/>
      </View>
      // if searched add that 'text' into a filter rectangular bubble
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
 
  export default SearchFilter;

