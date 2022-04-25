import { View, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity, Text} from 'react-native';
import React, { useState } from 'react';
import Confirm from './Confirm'
import { Auth } from 'aws-amplify';
import { ConsoleLogger } from '@aws-amplify/core';

function CreateAccount({navigation, confirmSignUp}) {
  const [ email, setEmail ] = useState(null)
  const [ pass, setPass ] = useState(null)
  const [ firstName, setFirst ] = useState(null)
  const [ lastName, setLast ] = useState(null)
  const [ confirmPass, setConfirmPass ] = useState(null)
  const [ attmpted, setAttempted ] = useState(false)

  function validEmail(){
    return email && email.includes('@') && email.includes('.')
  }
  function verifyUserDetails() {
    
    if(!lastName){
      alert("Please enter a first name")
      return false
    }
    if(!firstName){
      alert("Please enter a last name")
      return false
    }
    if(!validEmail()){
      alert("Please enter a valid email")
      return false
    }
    

    if( pass && pass===confirmPass){
      if(validEmail()){
        return true
        // navigation.navigate('login')
      }else{
        alert("Email Invalid")
        return false
      }
    }else{
      alert('Passwords do not match')
      return false
    }
    
  }
  async function createAccount(){
    if (verifyUserDetails()){
      try {
        await Auth.signUp({
          username: email, 
          password: pass, 
          attributes: {
            email: email,
            given_name: firstName, 
            family_name: lastName
          }})
          setAttempted(true)
      }catch (error) {
        seeError(error)
        //alert(error)
      }
    }
  }
  function seeError(error){
      if(String(error).includes('InvalidParameterException')){
        alert('Password too weak, enter a stronger password')
      }
      if(String(error).includes('UsernameExistsException')){
        alert('User with email already exists, use "Forgot Password" if you have lost the password')
      }
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
    container:{ 
      //flex: 1,
     // borderColor: 'gray',
      //borderRadius: 10,
      //borderWidth: 2,
      padding: 3,
      margin: 2,
      //opacity: 1,
      //backgroundColor: 'gray',
      
    },
  })

  return (
    !attmpted? 
    <View>
      
      <TextInput 
        style={Style.login_element} 
        placeholder='first name' 
        onChangeText={text => setLast(text)}/>

      <TextInput 
        style={Style.login_element} 
        placeholder='last name' 
        onChangeText={text => setFirst(text)}/>

      <TextInput 
        style={Style.login_element} 
        placeholder='user@email.com' 
        onChangeText={text => setEmail(text)}
        autoCorrect={false}/>

      <TextInput style={Style.login_element} 
        placeholder='password' 
        onChangeText={text => setPass(text)} 
        secureTextEntry={true}/>

      <TextInput style={Style.login_element} 
        placeholder='confirm password' 
        onChangeText={text => setConfirmPass(text)} 
        secureTextEntry={true}/>
<View style={{padding: 3}}>
        <ImageBackground source={require('../gradient.jpg')} resizeMode="cover" style={{ backgroundColor: 'white', borderRadius: 6, borderColor:'gray', borderWidth: 1, padding: 5}}  imageStyle={{ borderRadius: 6 ,borderColor: 'gray', opacity: 0.5}}>
          <TouchableOpacity style={Style.container} onPress={() => {createAccount()}} title='confirm'>
          <Text style={{textAlign: "center", fontWeight: "bold"}}>CREATE ACCOUNT</Text>
          </TouchableOpacity>
          </ImageBackground>
        </View>
      
    </View> :
    <Confirm email={email} navigation={navigation} destination='login' confirmSignUp={confirmSignUp}/>
  )
}
/*
<Button onPress={() => {createAccount()}} title='confirm'/>
*/

export default CreateAccount