import React, { useState } from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity, Image} from 'react-native';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword({navigation}) {
    const [email, setEmail] = useState('');
    const [invalidInput, setInvalidInput] = useState(false);
    const auth = getAuth();

    const passwordResetSubmit = () => {
        if(email.trim() == "" || !email.endsWith(".edu")) {
            setInvalidInput(invalidInput => invalidInput = true);
            return false;
        }

        sendPasswordResetEmail(auth, email)
        .then(() => {
            navigation.navigate('Forgot Password Success');
        })
        .catch((error) => {
            setInvalidInput((invalidInput) => invalidInput = true);
        });
    }


    return(
        <View style={styles.container}>
            <Text style={styles.infoText}>Please submit your email to receive instructions to reset your password.</Text>
            <View style = {styles.loginForm} >
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder={'Email'}
                        style={styles.textInput}
                        textContentType={"emailAddress"}
                        keyboardType={"email-address"}
                        autoCapitalize={"none"}
                        onChangeText={(text) => {
                            setEmail(text) 
                            setInvalidInput(invalidInput => invalidInput = false)
                        }}
                    />
                    {
                        invalidInput &&
                        <Text style={styles.inputWarning}> Invalid Email!</Text>
                    }
                    <TouchableOpacity 
                        style={styles.buttons} onPress={passwordResetSubmit}>
                        <Text style={styles.buttonText}> Submit </Text>
                    </TouchableOpacity>
                </View>

            </View>
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

    forgotPasswordForm: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '70%',
        width: '70%',
        marginBottom: '50%',
    },

    textInput: {
        flexDirection: 'row',
        width: '90%',
        height: '33%',
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: '10%',
    },

    inputWarning: {
        marginTop: '5%',
        color: 'red',
        fontWeight: 'bold',
    },

    buttonText: {
        fontWeight: 'bold',
        color: 'white',
    },

    infoText: {
        fontWeight: 'bold',
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%'
    },

    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingBottom: '10%',
        paddingLeft: '10%',
    },

    buttons: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: '30%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        marginTop: '10%',
        backgroundColor: '#0047AB',
    },

});
