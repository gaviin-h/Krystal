import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

function FilterButton({navigation}){
  return (
    <Icon name = 'filter' color = '#000000' size = {20} onPress={() => navigation.navigate('filter')}/>
  )
}
export default FilterButton