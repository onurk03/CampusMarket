import LoginForm from './components/login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from "./components/signUp";

export default function App() {
  const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={LoginForm}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUp}
            />
          </Stack.Navigator>
        </NavigationContainer>
    );
}
