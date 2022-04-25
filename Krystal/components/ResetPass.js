import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity, Text} from 'react-native';

function ResetPass({ changePassword, navigation}){
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
      <View style={{padding: 3}}>
        <ImageBackground source={require('../gradient.jpg')} resizeMode="cover" style={{ backgroundColor: 'white', borderRadius: 6, borderColor:'gray', borderWidth: 1, padding: 5}}  imageStyle={{ borderRadius: 6 ,borderColor: 'gray', opacity: 0.5}}>
          <TouchableOpacity style={Style.container} onPress={() => { verifyPass()? changePassword( confirmCode, pass, navigation).catch(error => alert(error)) : alert('Incorrect code or passwords do not match')}} title='confirm'>
          <Text style={{textAlign: "center", fontWeight: "bold"}}>RESET PASSWORD</Text>
          </TouchableOpacity>
          </ImageBackground>
        </View>

    
    </View>
  )
}

/*
<Button onPress={() => { verifyPass()? changePassword( confirmCode, pass, navigation).catch(error => alert(error)) : alert('check password')}} title='confirm'/>
*/
export default ResetPass