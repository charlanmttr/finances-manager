import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateAccount from '../screens/createAccount';
import AddCategories from '../screens/createAccount/addCategories';
import Login from '../screens/login';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false}}/>
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
            <Stack.Screen name="AddCategories" component={AddCategories} />
            {/* <Stack.Screen name="AddSubcategories" component={CreateAccount} /> */}
        </Stack.Navigator>
    )
}