import {StyleSheet, Text, View} from 'react-native';

export default function Chats({route, navigation}) {
    return(
      <View style={styles.container}>
        <Text style={styles.text}>Chats: </Text>
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
    text: {
        fontSize: '20%',
    }
})