import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import DrawerNavigation from './drawerNavigation';


const Stack = createNativeStackNavigator();




const StackNavigation = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen options={{headerShown:false}} name="Login" component={Login} />
    <Stack.Screen options={{headerShown:false}} name="SignUp" component={SignUp} />
    <Stack.Screen options={{headerShown:false}} name="DrawerNavigation" component={DrawerNavigation} />
    
  </Stack.Navigator>

  )
}

export default StackNavigation