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
import Listings from './Listings'
import AccountSettings from './AccountSettings';

const Stack = createNativeStackNavigator();

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
        initialRouteName="AccountSettings"
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
          <Stack.Screen name="Account Settings">
          { props => <AccountSettings 
              navigation={props.navigation} />}
        </Stack.Screen>
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
            { props => <Listings 
            queue={queue}
            navigation={props.navigation}/> }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
