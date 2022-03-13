import { ScrollView} from 'react-native';
import React from 'react';
import Article from './Article'

function Listings({queue, navigation, setCurrentArticle }) {
  return (
    <ScrollView >
      { queue.map((article) => 
      ( <Article 
        setCurrentArticle={setCurrentArticle}
        article={article}
        navigation={navigation}
        /> )) }
    </ScrollView>
  )
}
export default Listings