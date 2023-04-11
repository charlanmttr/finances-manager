import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/home';

const Drawer = createDrawerNavigator();

export default function AuthRoutes() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
      </Drawer.Navigator>
    )
  }