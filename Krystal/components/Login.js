import { View, TextInput, Button, ImageBackground, Text} from 'react-native';
import React, { useState } from 'react';
import {Image, StyleSheet} from 'react-native'
import { Auth } from 'aws-amplify';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
      SubmitButtonStyle: {
   
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#00BCD4',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
      },
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
    button: {
      MarginBottom: 20,
      padding: 20,
    },
    MainContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#F5FCFF',
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
        <Button style= {Style.SubmitButtonStyle} onPress={() => {
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
}/*


        <View style={{padding: 3}}>
        <ImageBackground source={require('../gradient.jpg')} resizeMode="cover" style={{ backgroundColor: 'white', borderRadius: 6, borderColor:'gray', borderWidth: 1, padding: 5}}  imageStyle={{ borderRadius: 6 ,borderColor: 'gray', opacity: 0.5}}>
          <TouchableOpacity style={Style.container} onPress={() => {
        attemptLogin(user, pass)}} 
        title='login'>
          <Text style={{textAlign: "center", fontWeight: "bold"}}>LOGIN</Text>
          </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={{padding: 3}}>
        <ImageBackground source={require('../gradient.jpg')} resizeMode="cover" style={{ backgroundColor: 'white', borderRadius: 6, borderColor:'gray', borderWidth: 1, padding: 5}}  imageStyle={{ borderRadius: 6 ,borderColor: 'gray', opacity: 0.5}}>
          <TouchableOpacity style={Style.container} onPress={() => navigation.navigate("createAccount")}>
          <Text style={{textAlign: "center", fontWeight: "bold"}}>CREATE ACCOUNT</Text>
          </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={{padding: 3}}>
        <ImageBackground source={require('../gradient.jpg')} resizeMode="cover" style={{ backgroundColor: 'white', borderRadius: 6, borderColor:'gray', borderWidth: 1, padding: 5}}  imageStyle={{ borderRadius: 6 ,borderColor: 'gray', opacity: 0.5}}>
          <TouchableOpacity style={Style.container} onPress={() => { user? 
        forgot() : alert('Please enter your email first')}}>
          <Text style={{textAlign: "center", fontWeight: "bold"}}>FORGOT PASSWORD?</Text>
          </TouchableOpacity>
          </ImageBackground>
        </View>

*/

export default Login