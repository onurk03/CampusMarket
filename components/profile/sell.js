
import {StyleSheet, Text, View, Button } from 'react-native';
import { getAuth } from "firebase/auth";

export default function Sell({route, navigation}) {
    const auth = getAuth();
    const user = route.params.user;
    return(
      <View style={styles.container}>
        <Text style={styles.username}>
            User: {user.fullName}
        </Text>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    username: {
        fontSize: '20%',
        marginBottom: '70%',
        marginTop: '70%'
    },
})