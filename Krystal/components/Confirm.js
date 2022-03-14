import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet} from 'react-native';

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
      placeholder='code' 
      onChangeText={text => setConfirmCode(text)} />

    <Button onPress={() => { confirmSignUp(email, confirmCode, navigation, destination)}} title='confirm'/>
    </View>
  )
}

export default Confirm