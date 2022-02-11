/**
 *  KRYSTAL 
 *  Application hub
 */
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';  

const Stack = createNativeStackNavigator();

// APP FUNCTION CALL 
const App = () => {

  // State
const [ userInfo, setUserInfo ] = useState(null)


// RETURN
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={Login} options={{attemptLogin: {setUserInfo}}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
