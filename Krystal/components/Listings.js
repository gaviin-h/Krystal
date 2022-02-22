import { View} from 'react-native';
import React from 'react';
import Article from './Article'

function Listings({queue, navigation, setCurrentArticle }) {
  return (
    <View >
      { queue.map((article) => 
      ( <Article 
        setCurrentArticle={setCurrentArticle}
        article={article}
        navigation={navigation}
        /> )) }
    </View>
  )
}
export default Listings