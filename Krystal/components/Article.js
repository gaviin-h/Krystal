import { ImageBackground, TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';
import React from 'react';
import { GraphQLScalarType } from '@aws-amplify/datastore';
import DefaultImage from '../li.png';

const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;

const Style=StyleSheet.create({
  title: {
    flex: 1, flexWrap: 'wrap',
    marginLeft: 6,
    fontSize: 20,
    fontWeight: 'bold',
    color: "black",
    padding: 2,
  },
  header: {
    marginTop: 2,
    marginLeft: 2,
    flexDirection: 'row',
      borderColor: "black",
      borderRadius: 6,
  },
  author: {
    color: "black",
    fontWeight: 'bold',
  },
  description: {
    color: "#282828",
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10
  },
  image: {
    opacity:0.5,
    justifyContent: "center",
    borderColor: "gray"
  },
  container:{ 
  
    flex: 1,
    borderColor: 'gray',
    padding: 3,
    margin: 2,
  }

})
const text = StyleSheet.compose(Style.image, Style.title);

function Article({ article, navigation, setCurrentArticle}) {
  var image = { uri: article.urlToImage};
  
  
  return (
        
    <TouchableOpacity 
      style={Style.container} 
      onPress={ () => {
        setCurrentArticle(article)
        navigation.navigate('articlePage')}}>
         
      <ImageBackground source={image} resizeMode="cover" style={{ backgroundColor: 'white', borderRadius: 6, borderColor:'gray', borderWidth: 1}}  imageStyle={{ borderRadius: 6 ,borderColor: 'gray', opacity: 0.5}}>
      <View style={Style.header}>
      <Image resizeMode='cover' source={getLogo(article)} style={{maxWidth:50,height:50, borderRadius: 6, borderColor:'gray'}}></Image>
      <Text style={Style.title}>
        {article.title}
      </Text>
      </View>
      <Text style={Style.description}>
        {article.description}
      </Text>
      </ImageBackground>  
    </TouchableOpacity>
    
  )
}
/*
<View style={Style.header}>
         
          </View>
*/
function getLogo(article){
  if(typeof article.source!=='undefined'){
    
    if(String(article.source['name'])=="New York Times"){
        return require('../New_York_Times.png');
    }
    if(String(article.source['name'])=="BBC News"){
        return require('../BBC_News.png');
    }
    if(String(article.source['name'])=="Associated Press"){
      return require('../ap.jpg');
    }
    if(String(article.source['name'])=="Fox News"){
      return require('../fox.png');
    }
    if(String(article.source['name'])=="CNN"){
      return require('../cnn.jpg');
    }if(String(article.source['name'])=="CNBC"){
      return require('../cnbc.png');
    }if(String(article.source['name'])=="ESPN"){
      return require('../espn.png');
    }if(String(article.source['name'])=="The Washington Post"){
      return require('../wp.png');
    }if(String(article.source['name'])=="Marca"){
      return require('../cnn.jpg');
    }if(String(article.source['name'])=="Yahoo Entertainment"){
      return require('../yahoo.png');
    }if(String(article.source['name'])=="Barron's"){
      return require('../cnn.jpg');
    }if(String(article.source['name'])=="Reuters"){
      return require('../Reuters.jpg');
    }if(String(article.source['name'])=="The Verge"){
      return require('../verge.jpg');
    }else{
      return require('../default.jpg');
    }
  }
}

export default Article