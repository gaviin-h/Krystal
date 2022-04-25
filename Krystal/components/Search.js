import { View, TextInput, StyleSheet, Button, Text, ImageBackground} from 'react-native';
import React, { useState,useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Style=StyleSheet.create({
  search: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'white',
    borderRadius: 10,
  },
  container:{ 
    //flex: 1,
   // borderColor: 'gray',
    //borderRadius: 10,
    //borderWidth: 2,
    padding: 3,
    margin: 2,
    //opacity: 1,
    //backgroundColor: 'gray',
    
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
       <View style={{padding: 3, marginLeft: 4, marginRight: 4}}>
        <ImageBackground source={require('../gradient.jpg')} resizeMode="cover" style={{ backgroundColor: 'white', borderRadius: 6, borderColor:'gray', borderWidth: 1}}  imageStyle={{ borderRadius: 6 ,borderColor: 'gray', opacity: 0.5}}>
          <TouchableOpacity 
            style={Style.container} 
            onPress={ () => search(currentQuery)}>
          <Text style={{textAlign: "center", fontWeight: "bold"}}>SEARCH</Text>
          </TouchableOpacity>
          </ImageBackground>
        </View>
     
    </View>
  )
}

/*

  <Button title='Search' onPress={() => search(currentQuery)} />
*/
export default Search