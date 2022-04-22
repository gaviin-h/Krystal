import { ImageBackground, TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';
import React from 'react';
import { GraphQLScalarType } from '@aws-amplify/datastore';
import DefaultImage from '../li.png';

const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;

const Style=StyleSheet.create({
  title: {
    //textShadowColor: '#000', textShadowOffset: { width: 1.5, height: 1.5 }, textShadowRadius: 1,
    //backgroundColor: "gray",
    fontSize: 20,
    fontWeight: 'bold',
    color: "black",
    padding: 5
  },
  header: {
    backgroundColor: "black",
      borderColor: "black",
      borderRadius: 6,
  },
  author: {
    //textShadowColor: '#000', textShadowOffset: { width: 1.5, height: 1.5 }, textShadowRadius: 1,
    //backgroundColor: "gray",
    color: "black",
    fontWeight: 'bold',
    //fontWeight: '300'
  },
  description: {
    //textShadowColor: '#fff', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,
    //backgroundColor: "gray",

    color: "#282828",
    fontWeight: 'bold',
    marginLeft: 20
  },
  image: {
    opacity:0.5,
    justifyContent: "center",
    borderColor: "gray"
  },
  container:{ 
  
    flex: 1,
    borderColor: 'gray',
    //borderRadius: 10,
    //borderWidth: 2,
    padding: 1,
    margin: 2,
    //opacity: 1,
    //backgroundColor: 'gray',
    
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
         
      <ImageBackground source={image} resizeMode="cover" style={{ backgroundColor: 'white', borderRadius: 6, borderColor:'gray'}}  imageStyle={{ borderRadius: 6 ,borderColor: 'gray', opacity: 0.5}}>
      <Text style={Style.title}>
        {article.title}
      </Text>
      <Text style={Style.author}>
      {article.author}
      </Text>
      <Text style={Style.description}>
        {article.description}
      </Text>
      </ImageBackground>  
    </TouchableOpacity>
    
  )
}
/*
<View style={Style.header}>
          <Image resizeMode="cover" source={getLogo(article)} style={{maxWidth:50,height:50,}}></Image>
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
      return require('../New_York_Times.png');
    }
    if(String(article.source['name'])=="Fox News"){
      return require('../New_York_Times.png');
    }
    if(String(article.source['name'])=="CNN"){
      return require('../cnn.jpg');
    }if(String(article.source['name'])=="CNBC"){
      return require('../cnn.jpg');
    }if(String(article.source['name'])=="ESPN"){
      return require('../cnn.jpg');
    }if(String(article.source['name'])=="The Washington Post"){
      return require('../cnn.jpg');
    }if(String(article.source['name'])=="Marca"){
      return require('../cnn.jpg');
    }if(String(article.source['name'])=="Yahoo Entertainment"){
      return require('../cnn.jpg');
    }if(String(article.source['name'])=="Barron's"){
      return require('../cnn.jpg');
    }
  }
}

export default Article