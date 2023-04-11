import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/login';
import CreateAccount from '../screens/createAccount';
import AddCategories from '../screens/createAccount/addCategories';

const Stack = createNativeStackNavigator();

export default function SignInRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="AddCategories" component={AddCategories} />
    </Stack.Navigator>
  )
}