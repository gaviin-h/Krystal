/**
 *  KRYSTAL 
 *  Application hub
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Login from './components/Login';  Import your components here

const Stack = createNativeStackNavigator();

// APP FUNCTION CALL 
const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login"> {// change this to what you want to see}
        {/* <Stack.Screen name="login" component={Login} /> your component here*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
