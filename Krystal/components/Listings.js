import { View} from 'react-native';
import React from 'react';
import Article from './Article'

function Listings({queue, navigation}) {
  return (
    <View >
      { queue.map((article) => 
      ( <Article 
        title={article.title} 
        author={article.author} 
        description={article.description}
        key={article.key}
        navigation={navigation}
        /> )) }
    </View>
  )
}
export default Listings