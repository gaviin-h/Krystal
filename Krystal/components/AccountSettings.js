import { View, TextInput, Button, Text } from 'react-native';
import React, { useState } from 'react';
import {StyleSheet} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerItem, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer'
import Header from './Header'

function AccountSettings(navigation){
    const [ first, setFirstName ] = useState(null)
    const [ last, setLastName ] = useState(null)
    const [ email, setEmailAddress ] = useState(null)
    const [ phone, setPhoneNumber ] = useState(null)
    const [ password, setPassword ] = useState(null)
   
    const Style = StyleSheet.create({
          TextInput: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            borderColor: 'white',
            borderRadius: 10,
          },
        })
    return(
       <View //style={Style.TextInput}>
       >
           <Text style={Style.title}>
             {"     First Name"}
             </Text>
          <TextInput 
            style={Style.TextInput} 
            placeholder='Enter new First Name' 
            onChangeText={text => setFirstName(text)}/>
            <Text style={Style.title}>
             {"     Last Name"}
             </Text>
          <TextInput style={Style.TextInput} 
            placeholder='Enter new Last Name' 
            onChangeText={text => setLastName(text)} 
            />
            <Text style={Style.title}>
             {"     Email"}
             </Text>
            <TextInput style={Style.TextInput} 
            placeholder='Enter new Email Address' 
            onChangeText={text => setEmailAddress(text)} 
            />
            <Text style={Style.title}>
             {"     Phone Number"}
             </Text>
            <TextInput style={Style.TextInput} 
            placeholder='Enter new Phone Number' 
            onChangeText={text => setPhoneNumber(text)} 
            />
            
            <Text style={Style.title}>
             {"     Password"}
             </Text>
            <TextInput style={Style.TextInput} 
            placeholder='Enter new Password' 
            onChangeText={text => setPassword(text)} 
            secureTextEntry={true}/>
    
          
          <Button 
            color='grey' 
            title='Save' 
            onPress={() => navigation.navigate("login")}/>
            <Text style={Style.title}>
             {"Block List:"}
             </Text>
            <TextInput style={Style.TextInput} 
            placeholder='Add a blocked source:' 
           />
           <Button 
            color='grey' 
            title='Add' 
            onPress={() => navigation.navigate("login")}/>

        </View>
      )
}
export default AccountSettings
