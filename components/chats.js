import {StyleSheet, Text, View} from 'react-native';

export default function Chats({route, navigation}) {
    return(
      <View style={styles.container}>
        <Text>Chats: </Text>
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