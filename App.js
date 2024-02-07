import React, { useState, createContext, useContext, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/Screens/Login';
import SignUp from './src/Screens/SignUp';
import Chat from './src/Screens/Chat';
import Home from './src/Screens/Home';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/config/firebase';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from './src/Screens/Profile';
import UpdateProfile from './src/Screens/UpdateProfile';


const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});
const Drawer = createDrawerNavigator();

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

function ChatStack() {
  return (
    <Stack.Navigator defaultScreenOptions={Home}>
      <Stack.Screen options={{headerShown:false}} name='Home' component={Home} />
      <Stack.Screen options={{headerShown:true}} name='Chat' component={Chat} />
      <Stack.Screen options={{headerShown:false}} name='Settings' component={Settings} />
      <Stack.Screen options={{headerShown:false}} name='UpdateProfile' component={UpdateProfile} />
      
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='SignUp' component={SignUp} />
    </Stack.Navigator>
  );
}

function Settings() {
  return (
    <Drawer.Navigator>
    <Drawer.Screen options={{headerShown:false}} name="Profile" component={Profile} />
   
  </Drawer.Navigator>
  );
}


function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
// unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);
if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

return (
    <NavigationContainer>
      {user ? <ChatStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}