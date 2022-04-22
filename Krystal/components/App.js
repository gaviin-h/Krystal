/**
 *  KRYSTAL 
 *  Application hub
 */
 import 'react-native-gesture-handler'
 import React, { useState } from 'react';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import { createDrawerNavigator, DrawerItem, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer'
 import Login from './Login';  
 import CreateAccount from './CreateAccount';
 import Header from './Header'
 import Main from './Main'
 import ArticlePage from './ArticlePage'
 import ResetPass from './ResetPass'
 import AccountSettings from './AccountSettings'
 import ContentSettings from './ContentSettings';
 import ShareContainer from './ShareContainer'
 import Filter from './Filter';
 import FilterButton from './FilterButton'

 // Amplify AWS stuff
 import { Amplify, Auth } from 'aws-amplify'
 import awsconfig from '../src/aws-exports'
 Amplify.configure({
   ...awsconfig,
   Analytics: {
     disabled: true,
   },
 });
 
 // LogBox.ignoreAllLogs()
 const Stack = createNativeStackNavigator();
 const Drawer = createDrawerNavigator();
 
 const HomeDrawer = ({drawerNav, queue, search, setCurrentArticle, currentArticle}) => {
   return(
     <Stack.Navigator initialRouteName='home'
       screenOptions={{ 
           headerTitle: () => 
             <Header 
               navigation={drawerNav}/>}}>
       <Stack.Screen name='home'
          options={(props) => ({headerRight: () => (<FilterButton navigation={props.navigation}/>)})}>
         { props => <Main 
         queue={queue}
         navigation={props.navigation}
         search={search}
         setCurrentArticle={setCurrentArticle}/>}
       </Stack.Screen>
       <Stack.Screen name='articlePage' 
        options={() => ({headerRight: () => (<ShareContainer articleUrl={currentArticle.url}/>)})}>
         { props => <ArticlePage 
         navigation={props.navigation}
         article={currentArticle}/>}
       </Stack.Screen>
       <Stack.Screen 
        name='filter' 
        options={{ 
          presentation: 'modal',
          headerShown: false  }}>
          { props => <Filter 
          navigation={props.navigation}/>}
       </Stack.Screen>
     </Stack.Navigator>
   )
 }
 
 // APP FUNCTION CALL 
 const App = () => {
 
 // search 
 async function search(query){
   const date = new Date()
   const ApiKey='c86e67c82f1e44e29fb5dd30095fb55b'
   let search_date=String(date.getFullYear())+'-'+String(date.getMonth() + 1)+'-'+String(date.getDate())  
   var url = 'https://newsapi.org/v2/everything?q=' + query + 
     '&from=' + search_date +'&sortBy=popularity&' +'apiKey='+ApiKey
 
   var req=new Request(url)
   fetch(req).then((response) => {
     response.json().then((data)=>{
         // pass json to function to distribute its contents to the div selected (in REACT this is much easier)
        setQueue(data.articles.slice(0,20))
      })
    })
    let user = await Auth.currentAuthenticatedUser();
    let result = await Auth.updateUserAttributes(user, {
        'custom:private_keys': query+','+user.attributes['custom:private_keys'],
    });
    console.log(result)
 }
 async function attemptLogin(user, pass){
   try {
    let attempt=await Auth.signIn(user, pass)
    setUserInfo(attempt.attributes)
    console.log(typeof(attempt.attributes))
    let term='apple'
    if (attempt.attributes['custom:private_keys'] !== undefined){
      term=attempt.attributes['custom:private_keys'].split(',')
    }
      fetch("https://v7c79w6j85.execute-api.us-west-2.amazonaws.com/dev/suggestengine?country="+term[0]).then((response) => {
      response.json().then((data) => {
        setQueue(data.articles.content.articles)
      })
    })
   }catch(error){
    alert(error)
   }
 }
 async function confirmSignUp(email, confirmCode, navigation, destination) {
   try {
     let conf = await Auth.confirmSignUp(email, confirmCode)
     alert(conf)
     navigation.navigate(destination)
   }catch(error) {
     alert(error)
   }
 }
  async function changePassword( code, password, navigation){
   try{   
     let conf = await Auth.forgotPasswordSubmit(forgotEmail, code, password)
     alert(conf)
     navigation.navigate('login')
   }catch(error) {
     alert(error)
   }
 } 
 // State
 const [ userInfo, setUserInfo ] = useState(null)
 const [ currentArticle, setCurrentArticle ] = useState(null)
 const [ forgotEmail, setForgotEmail ] = useState(null)
 const [ queue, setQueue ] = useState([
  {
    key: 1,
    title: 'Stone Burns',
    author: 'Gavin Newsom',
    description: 'The end times are upon us',
    url: 'https://www.nytimes.com/2020/04/02/us/coronavirus-apocalypse-religion.html',
    urlToImage: 'https://static9.depositphotos.com/1674252/1149/v/600/depositphotos_11496049-stock-illustration-warning-sign.jpg',
    source: {
      id: "bbc-news",
      name: "BBC News"
      },
  },
  {
    key: 2,
    title: 'Butterfly Away',
    author: 'Miley Cyrus',
    description: 'Idk I dont listen to Miley',
    url: 'https://www.youtube.com/watch?v=jjHNX_EBDus&ab_channel=MileyCyrus-Topic',
    urlToImage: 'https://static9.depositphotos.com/1674252/1149/v/600/depositphotos_11496049-stock-illustration-warning-sign.jpg',
    source: {
      id: "bbc-news",
      name: "BBC News"
      },
  }
])
 
 // RETURN
   return (
     !userInfo? 
       <NavigationContainer>
         <Stack.Navigator
           initialRouteName="login"
           >
           <Stack.Screen name="login">
               { props => <Login 
                   attemptLogin={attemptLogin}
                   Auth = { Auth }
                   navigation={props.navigation} 
                   setUserInfo={setForgotEmail}/>}
             </Stack.Screen>
             <Stack.Screen name="createAccount">
               { props => <CreateAccount
                 setUserInfo={setUserInfo} 
                 Auth = { Auth }
                 navigation={props.navigation} 
                 confirmSignUp={confirmSignUp}/>}
             </Stack.Screen>
             <Stack.Screen name='resetPass'>
               {props => <ResetPass 
               email = {userInfo} 
               navigation={props.navigation} 
               changePassword={changePassword}/>}
             </Stack.Screen>
         </Stack.Navigator>
       </NavigationContainer> 
     : 
       <NavigationContainer>
         <Drawer.Navigator initialRouteName='home'
         screenOptions={{ 
           headerShown: false
         }} 
         drawerContent={props => {
           return (
             <DrawerContentScrollView {...props}>
               <DrawerItemList {...props} />
               <DrawerItem label="Logout" onPress={() => setUserInfo(null)}/>
             </DrawerContentScrollView>
           )}}>
           <Drawer.Screen name='Home'>
             { props => <HomeDrawer 
             queue={queue}
             drawerNav={props.navigation}
             search={search}
             setCurrentArticle={setCurrentArticle}
             currentArticle={currentArticle}/>}
           </Drawer.Screen>
           <Drawer.Screen name="Account Settings"
            options={ (props) => ({
              headerShown: true,
              // headerTitle: () => <Header
              //  navigation={props.navigation}/> 
            })}>
             {props => <AccountSettings 
             navigation={props.navigation}/>}
           </Drawer.Screen>
           <Drawer.Screen name="Content Settings"options={ (props) => ({
              headerShown: true,
             // headerTitle: () => <Header
               //navigation={props.navigation}/> 
            })}>
             {props => <ContentSettings 
             navigation={props.navigation}/>}
           </Drawer.Screen>
          </Drawer.Navigator>
       </NavigationContainer>
   );
 };
 
 export default App;