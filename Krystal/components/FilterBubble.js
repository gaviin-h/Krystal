import { Pressable, StyleSheet } from 'react-native';

export default function FilterContainer({term, addTerm}){
  const Style = StyleSheet.create({
    bubble: {
      backgroundColor:'blue',
      height: 20,
      width: 40,
      borderRadius: 10
    }
  })
  return (
    <Pressable onPress={() => addTerm(term)} style={Style.bubble}><Text> {term}</Text></Pressable>
  )
}