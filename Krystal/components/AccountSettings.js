import { View, TextInput, Button, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native';


import React, { useState } from 'react';
import {StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerItem, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import Header from './Header';
import { UserAgent } from 'amazon-cognito-identity-js';

import { Amplify, Auth } from 'aws-amplify'

function AccountSettings(navigation){
    const [ userInfo, setUserInfo ] = useState(null)
    const [ first, setFirstName ] = useState(null)
    const [ last, setLastName ] = useState(null)
    const [ email, setEmailAddress ] = useState(null)
    const [ phone, setPhoneNumber ] = useState(null)
    const [ oldPassword, setOldPassword ] = useState(null)
    const [ newPassword, setNewPassword ] = useState(null)
    const [ setFirst, setFirstNameS ] = useState(null)
    const [ setLast, setLastNameS ] = useState(null)
    const [ setEmail, setEmailS ] = useState(null)

    

    async function deleteUser() {
      try {
        alert("This will permanently delete the current user account");
        const result = await Auth.deleteUser();
        setUserInfo(null);
        navigation.navigate('login');
        console.log(result);
      } catch (error) {
        console.log('Error deleting user', error);
      }
    }

    async function updateFirstName(newName){
      try{
      let user = await Auth.currentAuthenticatedUser();

      let result = await Auth.updateUserAttributes(user, {
        
        'given_name': newName
        });
      console.log("Changes first name to " + newName); // SUCCESS
      }catch (error){
        console.log('Error: ', error);
      }
    }
    async function updateLastName(newLastName){
      try{
      let user = await Auth.currentAuthenticatedUser();

      let result = await Auth.updateUserAttributes(user, {
        
        'family_name': newLastName
        });
      console.log("Changes Last name to " + newLastName); // SUCCESS
      }catch (error){
        console.log('Error: ', error);
      }
    }
    async function updateEmail(newEmail){
      try{
      let user = await Auth.currentAuthenticatedUser();

      let result = await Auth.updateUserAttributes(user, {
        
        'email': newEmail
        });
      console.log("Changes email to " + newEmail); // SUCCESS
      }catch (error){
        console.log('Error: ', error);
      }
    }
    async function changePassword(oldPassword, newPassword){
      Auth.currentAuthenticatedUser()
      .then(user => {
          return Auth.changePassword(user, oldPassword, newPassword);
      })
      .then(data => console.log(data))
      .catch(err => console.log(err));
    }
    async function getCurrentFirstName(){
      const {attributes} = await Auth.currentAuthenticatedUser();
      //console.log(attributes);
      setFirstNameS(attributes.given_name)
      
    }
    async function getCurrentLastName(){
      const {attributes} = await Auth.currentAuthenticatedUser();
      //console.log(attributes);
      setLastNameS(attributes.family_name)
      
    }
    async function getCurrentEmail(){
      const {attributes} = await Auth.currentAuthenticatedUser();
      //console.log(attributes);
      setEmailS(attributes.email)
      
    }
    getCurrentFirstName();
    getCurrentEmail();
    getCurrentLastName();
    
    

   
    const Style = StyleSheet.create({
          TextInput: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            borderColor: 'white',
            borderRadius: 10,
          },
          title: {
            fontWeight: 'bold',
            padding: 6
          }
        })
  
    return(
       <View //style={Style.TextInput}>
       > 
           <Text style={Style.title}>
              
             {'Current First Name: ' +setFirst}
             
             </Text>
          <TextInput 
            style={Style.TextInput} 
            placeholder='Enter new First Name' 
            onChangeText={text => setFirstName(text)}/>
            <View style={{padding: 3}}>
        <ImageBackground source={require('../gradient.jpg')} resizeMode="cover" style={{ backgroundColor: 'white', borderRadius: 6, borderColor:'gray', borderWidth: 1, padding: 5}}  imageStyle={{ borderRadius: 6 ,borderColor: 'gray', opacity: 0.5}}>
          <TouchableOpacity style={Style.container} onPress={() => [updateFirstName(first),getCurrentFirstName()] } title='confirm'>
          <Text style={{textAlign: "center", fontWeight: "bold"}}>CHANGE FIRST NAME</Text>
          </TouchableOpacity>
          </ImageBackground>
        </View>
           
            <Text style={Style.title}>
             {'Current Last Name: ' + setLast}
             </Text>
             
          <TextInput style={Style.TextInput} 
            placeholder='Enter new Last Name' 
            onChangeText={text => setLastName(text)} 
            />
            <View style={{padding: 3}}>
        <ImageBackground source={require('../gradient.jpg')} resizeMode="cover" style={{ backgroundColor: 'white', borderRadius: 6, borderColor:'gray', borderWidth: 1, padding: 5}}  imageStyle={{ borderRadius: 6 ,borderColor: 'gray', opacity: 0.5}}>
          <TouchableOpacity style={Style.container} onPress={() => [updateLastName(last),getCurrentLastName()]} title='confirm'>
          <Text style={{textAlign: "center", fontWeight: "bold"}}>CHANGE LAST NAME</Text>
          </TouchableOpacity>
          </ImageBackground>
        </View>
            
            <Text style={Style.title}>
             {"Current Email Address: " + setEmail}
             </Text>
            <TextInput style={Style.TextInput} 
            placeholder='Enter new Email Address' 
            onChangeText={text => setEmailAddress(text)} 
            />
            <View style={{padding: 3}}>
        <ImageBackground source={require('../gradient.jpg')} resizeMode="cover" style={{ backgroundColor: 'white', borderRadius: 6, borderColor:'gray', borderWidth: 1, padding: 5}}  imageStyle={{ borderRadius: 6 ,borderColor: 'gray', opacity: 0.5}}>
          <TouchableOpacity style={Style.container} onPress={() => [updateEmail(email), getCurrentEmail()]} title='confirm'>
          <Text style={{textAlign: "center", fontWeight: "bold"}}>CHANGE EMAIL ADDRESS</Text>
          </TouchableOpacity>
          </ImageBackground>
        </View>
            
            
            
            <Text style={Style.title}>
             {"Change Password"}
             </Text>
            <TextInput style={Style.TextInput} 
            placeholder='Enter Old Password' 
            onChangeText={text => setOldPassword(text)} 
            secureTextEntry={true}/>
            <TextInput style={Style.TextInput} 
            placeholder='Enter New Password' 
            onChangeText={text => setNewPassword(text)} 
            secureTextEntry={true}/>
            <View style={{padding: 3}}>
        <ImageBackground source={require('../gradient.jpg')} resizeMode="cover" style={{ backgroundColor: 'white', borderRadius: 6, borderColor:'gray', borderWidth: 1, padding: 5}}  imageStyle={{ borderRadius: 6 ,borderColor: 'gray', opacity: 0.5}}>
          <TouchableOpacity style={Style.container} onPress={() => changePassword(oldPassword,newPassword)} title='confirm'>
          <Text style={{textAlign: "center", fontWeight: "bold"}}>CHANGE PASSWORD</Text>
          </TouchableOpacity>
          </ImageBackground>
        </View>
            
          
            
        
        <View style={{padding: 3, marginTop: 30}}>
        <Text style={Style.title}>Delete Account</Text>
        <ImageBackground source={require('../gradient.jpg')} resizeMode="cover" style={{ backgroundColor: 'white', borderRadius: 6, borderColor:'gray', borderWidth: 1, padding: 5}}  imageStyle={{ borderRadius: 6 ,borderColor: 'gray', opacity: 0.5}}>
          <TouchableOpacity style={Style.container} onPress={() => {deleteUser()}} title='confirm'>
          <Text style={{textAlign: "center", fontWeight: "bold"}}>DELETE ACCOUNT</Text>
          </TouchableOpacity>
          </ImageBackground>
        </View>
        </View>
      )
      
}
export default AccountSettings
