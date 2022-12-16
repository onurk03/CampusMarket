import {StyleSheet, Text, View, Button } from 'react-native';
import { getAuth } from "firebase/auth";

export default function UserInfo({route, navigation}) {
    const auth = getAuth();
    const user = route.params.user;
    return(
      <View style={styles.container}>
        <Text>User: {user.fullName}</Text>
        <Button 
            title="Log Out!" 
            onPress={
                () => {
                    auth.signOut()
                    navigation.replace("Login");
                }
            }
        />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})