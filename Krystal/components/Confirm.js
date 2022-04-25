import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet, Text, ImageBackground, TouchableOpacity} from 'react-native';

const Style = StyleSheet.create({
  login_page: {
    justifyContent: 'flex-start',
    MarginBottom: '50%',
  },
  login_element: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'white',
    borderRadius: 10,
  },
})

function Confirm({email, navigation, destination, confirmSignUp}){
  const [ confirmCode, setConfirmCode ] = useState('')

  return (
    <View>
    <TextInput style={Style.login_element} 
      value={confirmCode}
      placeholder='enter confirmation code' 
      onChangeText={text => setConfirmCode(text)} />
<View style={{padding: 3}}>
        <ImageBackground source={require('../gradient.jpg')} resizeMode="cover" style={{ backgroundColor: 'white', borderRadius: 6, borderColor:'gray', borderWidth: 1, padding: 5}}  imageStyle={{ borderRadius: 6 ,borderColor: 'gray', opacity: 0.5}}>
          <TouchableOpacity style={Style.container} onPress={() => { confirmSignUp(email, confirmCode, navigation, destination)}} title='confirm'>
          <Text style={{textAlign: "center", fontWeight: "bold"}}>CONFIRM</Text>
          </TouchableOpacity>
          </ImageBackground>
        </View>
    
    </View>
  )
}
/*
<Button onPress={() => { confirmSignUp(email, confirmCode, navigation, destination)}} title='confirm'/>
*/

export default Confirm