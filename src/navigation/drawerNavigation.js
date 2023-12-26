import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Screens/Home';

const Drawer = createDrawerNavigator();


function DrawerNavigation() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
       
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;