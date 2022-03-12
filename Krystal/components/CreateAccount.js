import { View, TextInput, Button, StyleSheet} from 'react-native';
import React, { useState } from 'react';

function CreateAccount({navigation, Auth, setUserInfo}) {
  const [ email, setEmail ] = useState(null)
  const [ pass, setPass ] = useState(null)
  const [ firstName, setFirst ] = useState(null)
  const [ lastName, setLast ] = useState(null)
  const [ confirmPass, setConfirmPass ] = useState(null)

  function validEmail(){
    return email && email.includes('@') && email.includes('.')
  }
  function verifyUserDetails() {
    if( pass && pass===confirmPass){
      if(validEmail()){
        return true
        // navigation.navigate('login')
      }else{
        alert("Email Invalid")
        return false
      }
    }else{
      alert('Check Password')
      return false
    }
  }
  async function createAccount(){
    if (verifyUserDetails()){
      try {
        await Auth.signUp({email, pass, attributes: {firstName, lastName}})
      }catch (error) {
        alert(error)
      }
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
  })

  return (
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
        onChangeText={text => setEmail(text)}/>

      <TextInput style={Style.login_element} 
        placeholder='password' 
        onChangeText={text => setPass(text)} 
        secureTextEntry={true}/>

      <TextInput style={Style.login_element} 
        placeholder='confirm password' 
        onChangeText={text => setConfirmPass(text)} 
        secureTextEntry={true}/>

      <Button onPress={() => {createAccount()}} title='confirm'/>
    </View>
  )
}

export default CreateAccount