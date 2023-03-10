import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { getStringFromStorage } from './../utils/storage'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../screens/home';
import Login from '../screens/login';
import CreateAccount from '../screens/createAccount';
import AddCategories from '../screens/createAccount/addCategories';
import LoadingScreen from '../screens/loadingScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function Router() {
  const [userId, setUserId] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const getUserData = async () => {
      const storedID = await getStringFromStorage('@user_info_id');
      setUserId(storedID);
      setLoading(false)
    };

    getUserData();
  }, [])

  function DrawerRoutes() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
      </Drawer.Navigator>
    )
  }

  function AuthRoutes() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Drawer" component={DrawerRoutes} options={{ headerShown: false }} />
      </Stack.Navigator>
    )
  }

  function SignInRoutes() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="AddCategories" component={AddCategories} />
      </Stack.Navigator>
    )
  }

  if (isLoading) {
    return <LoadingScreen />
  } else {
    return (
      <NavigationContainer>
        {
          (userId !== null)
            ? <AuthRoutes />
            : <SignInRoutes />
        }
      </NavigationContainer>
    );
  }


}