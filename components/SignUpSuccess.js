import {StyleSheet, Text, TextInput, View, TouchableOpacity, Image} from 'react-native';
export default function SignUpSuccess({navigation}) {

    return(
        <View style={styles.container}>
            <Text style={styles.text}> Sign Up Successful!! {"\n"} Please verify your account through your email!</Text>
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

    text: {
        fontWeight: 'bold',
        color: 'black',
        padding: '5%'
    },

    buttons: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '8%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        marginTop: '10%',
        backgroundColor: '#0047AB',
    },

})
