import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Screens/Home';
import Slots from '../Screens/Slots';
import Chat from '../Screens/Chat';

const Drawer = createDrawerNavigator();


function DrawerNavigation() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen options={{headerShown:false}} name="Home" component={Home} />
      <Drawer.Screen options={{headerShown:false}} name="Slots" component={Slots} />

      <Drawer.Screen name="Chat" component={Chat} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;