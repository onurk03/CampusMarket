import {StyleSheet, Text, View} from 'react-native';
export default function ForgotPasswordSuccess({navigation}) {

    return(
        <View style={styles.container}>
            <Text style={styles.text}> Successful!!</Text>
            <Text style={styles.text}> Follow the link sent to your email to reset your password!</Text>
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
        fontSize: '15%',
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
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
