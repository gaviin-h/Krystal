import { View, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import {Image, StyleSheet} from 'react-native'
import { Auth } from 'aws-amplify';
import logo from '../li.png'

function Login({ navigation, attemptLogin, setUserInfo }){
  const [ user, setUser ] = useState(null)
  const [ pass, setPass ] = useState(null)
  function forgot(){
    setUserInfo(user)
    Auth.forgotPassword(user).then(navigation.navigate('resetPass')).catch(error => alert(error))
  }
  const Style = StyleSheet.create({
    
    image: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      height: 200,
      width: 200,
    },
    login_page: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      MarginBottom: '50%',
    },
    login_element: {
      minWidth: 300,
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderColor: 'white',
      borderRadius: 10,
    },
    button: {
      MarginBottom: 20,
      padding: 20,
    },
  })
  return(
    
    <View style={Style.login_page}>
      <Image 
        style={Style.image}
        source={logo}
      />
      <TextInput 
        style={Style.login_element} 
        placeholder='user@email.com' 
        onChangeText={text => setUser(text)}
        autoCorrect={false}/>
      <TextInput style={Style.login_element} 
        placeholder='password' 
        onChangeText={text => setPass(text)} 
        secureTextEntry={true}/>

      <Button style= {Style.button} onPress={() => {
        attemptLogin(user, pass)}} 
        title='login'/>
      <Button style= {Style.button}
        color='grey' 
        title='create account' 
        onPress={() => navigation.navigate("createAccount")}/>
      <Button style= {Style.button} onPress={() => { user? 
        forgot() : alert('Please enter your email first')}} 
        title='forgot password?'
        color='grey'/>
    </View>
  )
}

export default Login