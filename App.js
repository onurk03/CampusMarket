import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from './components/common/mainpage';
import LoginForm from './components/auth/login';
import SignUp from "./components/auth/signUp";
import SignUpSuccess from "./components/auth/SignUpSuccess";
import ForgotPassword from './components/auth/forgotPassword';
import ForgotPasswordSuccess from './components/auth/forgotPasswordSuccess';

export default function App() {
    const Stack = createNativeStackNavigator();

    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen
            name="Login"
            component={LoginForm}
          />
          <Stack.Screen
            name="Sign Up"
            component={SignUp}
          />
          <Stack.Screen
            name="Sign Up Success"
            component={SignUpSuccess}
          />
          <Stack.Screen 
            name="Main Page" 
            component={MainPage} 
            options={{headerShown: false}}
          />
          <Stack.Screen 
            name="Forgot Password" 
            component={ForgotPassword} 
          />
          <Stack.Screen 
            name="Forgot Password Success" 
            component={ForgotPasswordSuccess} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
}
