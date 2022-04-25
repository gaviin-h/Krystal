import { Image, StyleSheet, View } from 'react-native'
import logo from '../limt.png'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

function Header({ navigation }) {
  const Style = StyleSheet.create({
    image: {
      
      position: "absolute",
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
      height: 50,
      width: 100,
    },
    view: {
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      flexDirection: 'row'
    },
    barsIcon: {
      position: 'absolute',
      left: 10
    }
  })
  return (
    <View style={Style.view}>
      <Icon style={Style.barsIcon} name='bars' size={30} onPress={() => navigation.toggleDrawer() }/>
      <Image 
        style={Style.image}
        source={logo}
      />
    </View>
  )
}

export default Header