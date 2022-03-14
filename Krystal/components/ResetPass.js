import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet} from 'react-native';

function ResetPass({email, changePassword, navigation}){
  const [ confirmPass, setConfirmPass ] = useState(null)
  const [ pass, setPass ] = useState(null)
  const [ confirmCode, setConfirmCode ] = useState(null)
  const Style = StyleSheet.create({
    login_element: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderColor: 'white',
      borderRadius: 10,
    },
  })
  function verifyPass(){
    return pass && pass===confirmPass
  }
  return (
    <View>
      
    <TextInput style={Style.login_element} 
      value={confirmCode}
      placeholder='code' 
      onChangeText={text => setConfirmCode(text)} />
    <TextInput style={Style.login_element} 
      value={pass}
      placeholder='new password' 
      onChangeText={text => setPass(text)}
      secureTextEntry={true} />
    <TextInput style={Style.login_element} 
      value={confirmPass}
      placeholder='confirm password' 
      onChangeText={text => setConfirmPass(text)} 
      secureTextEntry={true}/>

    <Button onPress={() => { verifyPass()? changePassword( confirmCode, pass, navigation).catch(error => alert(error)) : alert('check password')}} title='confirm'/>
    </View>
  )
}

export default ResetPass