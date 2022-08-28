import {StyleSheet, View } from 'react-native';
import LoginForm from './components/login';

export default function App() {
  return (
    <View style={styles.container}>
      <LoginForm/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
