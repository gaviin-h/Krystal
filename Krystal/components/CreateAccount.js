import { View, TextInput, Button, StyleSheet} from 'react-native';
import React, { useState } from 'react';

function CreateAccount({navigation, Auth}) {
  const [ email, setEmail ] = useState(null)
  const [ pass, setPass ] = useState(null)
  const [ firstName, setFirst ] = useState(null)
  const [ lastName, setLast ] = useState(null)
  const [ confirmPass, setConfirmPass ] = useState(null)
  const [ attmpted, setAttempted ] = useState(false)
  const [ confirmCode, setConfirmCode ] = useState(null)

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
        alert(error)
      }
    }
  }
  async function confirmSignUp() {
    try {
      let conf = await Auth.confirmSignUp(email, confirmCode)
      alert(conf)
      navigation.navigate('login')
    }catch(error) {
      alert(error)
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

      <Button onPress={() => {createAccount()}} title='confirm'/>
    </View> :
    <View>
      <TextInput style={Style.login_element} 
        value={confirmCode}
        placeholder='code' 
        onChangeText={text => setConfirmCode(text)} />

      <Button onPress={() => { confirmSignUp() }} title='confirm'/>
    </View>
  )
}

export default CreateAccount