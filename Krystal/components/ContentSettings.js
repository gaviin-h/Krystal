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
            fontSize: 30,
              height: 40,
              alignItems: 'center',

          },
          headers:{
            //margin: 20,
            //padding: 10,
              height: 40,
              fontSize: 20,
          },
          
        })
    return(
       <View //style={Style.TextInput}>
       >
          
           <Text style={Style.headers}>
             {"    Explore Filters"}
             </Text>
          <TextInput 
            style={Style.TextInput} 
            placeholder='Search' 
            onChangeText={text => searchAvailable(text)}/>
            <Button 
            color='#006b76' 
            title='Search' 
            />
            
        
            
            <Text style={Style.headers}>
             {"     Current Filters"}
             </Text>
            <TextInput style={Style.TextInput} 
            placeholder='Search' 
            onChangeText={text => searchCurrent(text)} 
            secureTextEntry={true}/>
            <Button 
            color='#006b76' 
            title='Search' 
            />
    
          
          

        </View>
      )
}
export default ContentSettings
