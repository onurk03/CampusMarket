import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from './components/mainpage';
import LoginForm from './components/login';
import SignUp from "./components/signUp";
import SignUpSuccess from "./components/SignUpSuccess";

export default function App() {
    const Stack = createNativeStackNavigator();

    return(
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
          <Stack.Screen
            name="SignUpSuccess"
            component={SignUpSuccess}
          />
          <Stack.Screen 
            name="MainPage" 
            component={MainPage} 
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
}
