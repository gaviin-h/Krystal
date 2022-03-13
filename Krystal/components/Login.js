import { View, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import {StyleSheet} from 'react-native'

function Login({ navigation, attemptLogin }){
  const [ user, setUser ] = useState(null)
  const [ pass, setPass ] = useState(null)
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
  return(
    <View style={Style.login_page}>
      <TextInput 
        style={Style.login_element} 
        placeholder='user@email.com' 
        onChangeText={text => setUser(text)}
        autoCorrect={false}/>
      <TextInput style={Style.login_element} 
        placeholder='password' 
        onChangeText={text => setPass(text)} 
        secureTextEntry={true}/>

      <Button onPress={() => {
        attemptLogin(user, pass)}} 
        title='login'/>
      <Button 
        color='grey' 
        title='create account' 
        onPress={() => navigation.navigate("createAccount")}/>
    </View>
  )
}

export default Login