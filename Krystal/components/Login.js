import { View, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import Style from '../Style'

function Login({attemptLogin}){
  const [ user, setUser ] = useState(null)
  const [ pass, setPass ] = useState(null)
  
  return(
    <View style={Style.login_page}>
      <TextInput style={Style.login_element} placeholder='user@email.com' onChangeText={text => setUser(text)}/>
      <TextInput style={Style.login_element} placeholder='password' onChangeText={text => setPass(text)}/>

      <Button style={Style.login_button} onPress={attemptLogin(user, pass)} title='login'/>
    </View>
  )
}

export default Login