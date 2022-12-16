import {Text, View, StyleSheet } from "react-native";

export default function Dashboard({navigation, route}) {
    const user = route.params.user;
    return(
        <View style={styles.container}>
            <Text> Welcome {user.fullName}!!</Text>
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
})