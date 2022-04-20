import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react'

export default function FilterContainer({term, functionality, style}){

  return (
    <Pressable onPress={() => functionality(term)} style={style}><Text> {term}</Text></Pressable>
  )
}