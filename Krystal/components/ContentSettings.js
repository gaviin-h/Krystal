import { View, TextInput, Button, Text } from 'react-native';
import React, { useState } from 'react';
import {StyleSheet} from 'react-native'
import { CurrentRenderContext, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerItem, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer'
 import Header from './Header'
import { createAnimatedPropAdapter } from 'react-native-reanimated';

function ContentSettings(navigation){
    
   const searchCurrent = "";
   const searchAvailable = "";
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
              height: 80,
              alignItems: 'center',

          }
          
        })
    return(
       <View //style={Style.TextInput}>
       >
           <Text style={Style.title}>
             {"    Content Settings"}
             </Text>
           <Text style={Style.title}>
             {"    Explore Filters"}
             </Text>
          <TextInput 
            style={Style.TextInput} 
            placeholder='Search' 
            onChangeText={text => searchAvailable(text)}/>
        
            
            <Text style={Style.title}>
             {"     Current Filters"}
             </Text>
            <TextInput style={Style.TextInput} 
            placeholder='Search' 
            onChangeText={text => searchCurrent(text)} 
            secureTextEntry={true}/>
    
          
          

        </View>
      )
}
export default ContentSettings
