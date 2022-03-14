import { View, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import {StyleSheet} from 'react-native'
import { Auth } from 'aws-amplify';

function Login({ navigation, attemptLogin, setUserInfo }){
  const [ user, setUser ] = useState(null)
  const [ pass, setPass ] = useState(null)
  function forgot(){
    setUserInfo(user)
    Auth.forgotPassword(user).then(navigation.navigate('resetPass')).catch(error => alert(error))
  }
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
      <Button onPress={() => { user? 
        forgot() : alert('Please enter your email first')}} 
        title='forgot password?'
        color='grey'/>
    </View>
  )
}

export default Login