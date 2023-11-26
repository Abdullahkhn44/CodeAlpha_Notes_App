
import React from 'react';
import Home from './Components/Screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notes from './Components/Screens/Notes';
import Work from './Components/Screens/Work';
import Personal from './Components/Screens/Personal';
import Write from './Components/Screens/Write';
import BigNote from './Components/Screens/BigNote';




const Stack = createNativeStackNavigator();


export default function App() {


  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
        <Stack.Screen name="Notes" component={Notes}  options={{headerShown: false}} />
        <Stack.Screen name="Personal" component={Personal}  options={{headerShown: false}} />
        <Stack.Screen name="Work" component={Work}  options={{headerShown: false}} />
        <Stack.Screen name="Write Notes" component={Write}   options={{headerStyle: {
      backgroundColor: 'black'
    },headerTintColor:'white'}} />
      <Stack.Screen name="BigNote" component={BigNote}   options={{headerStyle: {
      backgroundColor: 'black'
    },headerTintColor:'white'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
