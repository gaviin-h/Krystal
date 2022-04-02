import { View, TextInput, StyleSheet, Button} from 'react-native';
import React, { useState } from 'react';


const Style=StyleSheet.create({
  search: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'white',
    borderRadius: 10,
  }
})

function Search({search}) {
  const [ currentQuery, setCurrentQuery ] = useState()
  return (
    <View >
      <TextInput 
        style={Style.search}
        placeholder='Search...'
        onChangeText={(text) => setCurrentQuery(text)}/>
      <Button title='Search' onPress={() => search(currentQuery)} />
    </View>
  )
}

export default Search