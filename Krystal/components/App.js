/**
 *  KRYSTAL 
 *  Application hub
 */
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';  
import CreateAccount from './CreateAccount';
import Header from './Header'
import Main from './Main'

const Stack = createNativeStackNavigator();

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
        setQueue(data.articles[0,10])
    })
  })
}

// APP FUNCTION CALL 
const App = () => {

// State
const [ userInfo, setUserInfo ] = useState(null)
const [ showMenu, setShowMenu ] = useState(false)
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
        initialRouteName="test"
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
        <Stack.Screen name='test'>
            { props => <Main 
            queue={queue}
            navigation={props.navigation}
            search={search}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
