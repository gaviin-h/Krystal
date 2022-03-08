/**
 *  KRYSTAL 
 *  Application hub
 */
<<<<<<< HEAD
 import React, { useState } from 'react';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import Login from './Login';  
 import CreateAccount from './CreateAccount';
 import Header from './Header'
 import Main from './Main'
 import ArticlePage from './ArticlePage'
 
 const Stack = createNativeStackNavigator();
 
 
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
   fetch(req).then(function(response) {
     response.json().then((data)=>{
         // pass json to function to distribute its contents to the div selected (in REACT this is much easier)
         setQueue(data.articles.slice(0,3))
       })
     })
 }
 
 // State
 const [ userInfo, setUserInfo ] = useState(null)
 const [ showMenu, setShowMenu ] = useState(false)
 const [ currentArticle, setCurrentArticle ] = useState(null)
 const [ queue, setQueue ] = useState([
     {
       key: 1,
       title: 'Stone Burns',
       author: 'Gavin Newsom',
       description: 'The end times are upon us'
     },
     {
       key: 2,
       title: 'Butterfly Away',
       author: 'Miley Cyrus',
       description: 'Idk I dont listen to Miley'
     }
 ])
 
 // RETURN
   return (
     <NavigationContainer>
       <Stack.Navigator 
         initialRouteName="login"
         screenOptions={{ 
           // headerStyle: {
           // },
           // headerTintColor: '#fff', // Font color
           headerTitleStyle: {
             color: 'rgba(0,0,0,0)',
           },
           headerBackground: () => (
             <Header setShowMenu={setShowMenu}/>
           )
         }}>
         <Stack.Screen name="login">
           { props => <Login 
               attemptLogin={setUserInfo}
               navigation={props.navigation} />}
         </Stack.Screen>
         <Stack.Screen name="createAccount">
           { props => <CreateAccount
             createAccount={setUserInfo} 
             navigation={props.navigation} />}
         </Stack.Screen>
         <Stack.Screen name='main'>
             { props => <Main 
             queue={queue}
             navigation={props.navigation}
             search={search}
             setCurrentArticle={setCurrentArticle}/>}
         </Stack.Screen>
         <Stack.Screen name='articlePage'>
             { props => <ArticlePage 
             navigation={props.navigation}
             article={currentArticle}/>}
         </Stack.Screen>
       </Stack.Navigator>
     </NavigationContainer>
   );
 };
 
 export default App;
=======
import 'react-native-gesture-handler'
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerItem, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer'
import { LogBox } from 'react-native';
import Login from './Login';  
import CreateAccount from './CreateAccount';
import Header from './Header'
import Main from './Main'
import ArticlePage from './ArticlePage'

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
      <Stack.Screen name='home'>
        { props => <Main 
        queue={queue}
        navigation={props.navigation}
        search={search}
        setCurrentArticle={setCurrentArticle}/>}
      </Stack.Screen>
      <Stack.Screen name='articlePage'>
        { props => <ArticlePage 
        navigation={props.navigation}
        article={currentArticle}/>}
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
  fetch(req).then(function(response) {
    response.json().then((data)=>{
        // pass json to function to distribute its contents to the div selected (in REACT this is much easier)
        setQueue(data.articles.slice(0,20))
      })
    })
}

// State
const [ userInfo, setUserInfo ] = useState(null)
const [ showMenu, setShowMenu ] = useState(false)
const [ currentArticle, setCurrentArticle ] = useState(null)
const [ queue, setQueue ] = useState([
    {
      key: 1,
      title: 'Stone Burns',
      author: 'Gavin Newsom',
      description: 'The end times are upon us',
      url: 'https://www.nytimes.com/2020/04/02/us/coronavirus-apocalypse-religion.html'
    },
    {
      key: 2,
      title: 'Butterfly Away',
      author: 'Miley Cyrus',
      description: 'Idk I dont listen to Miley',
      url: 'https://www.youtube.com/watch?v=jjHNX_EBDus&ab_channel=MileyCyrus-Topic'
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
                  attemptLogin={setUserInfo}
                  navigation={props.navigation} />}
            </Stack.Screen>
            <Stack.Screen name="createAccount">
              { props => <CreateAccount
                createAccount={setUserInfo} 
                navigation={props.navigation} />}
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
              <DrawerItem label="logout" onPress={() => setUserInfo(null)}/>
            </DrawerContentScrollView>
          )}}>
          <Drawer.Screen name='home'>
            { props => <HomeDrawer 
            queue={queue}
            drawerNav={props.navigation}
            search={search}
            setCurrentArticle={setCurrentArticle}
            currentArticle={currentArticle}/>}
          </Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
  );
};

export default App;
>>>>>>> dev
