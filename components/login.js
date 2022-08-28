import React, { useState } from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity, Image} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordSecure, seePassword ] = useState(true);

    function togglePassword() {
        seePassword(visibility => !visibility);
    }

    return(
        <View style = {styles.loginForm} >
            <Image
                style={styles.logo}
                source={require('../assets/logo.png')}
            />
            <View style={styles.passwordInput}>
                <TextInput
                    placeholder={'Email'}
                    style={styles.textInput}
                    textContentType={"emailAddress"}
                    keyboardType={"email-address"}
                />
                <TextInput
                    placeholder={'Password'}
                    style={styles.textInput}
                    secureTextEntry={passwordSecure}
                    textContentType={"password"}

                />
                <TouchableOpacity style={styles.eyeIcon} onPress={togglePassword}>
                    <Ionicons name={"eye-outline"} size={32} />
                </TouchableOpacity>
                {
                    !passwordSecure &&
                    (<Text style={{
                        color: 'red',
                        padding: 0,
                    }}
                    > Password Visible! </Text>)
                }
            </View>
            <TouchableOpacity
                style= {styles.loginButton}>
                <Text style={styles.text}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.loginButton}>
                <Text style={styles.text}>SIGNUP</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

    loginForm: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '70%',
        width: '70%',
        marginBottom: '50%',
    },

    textInput: {
        width: 200,
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: '10%',
    },

    text: {
        fontWeight: 'bold',
        color: 'white'
    },

    loginButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        marginTop: '10%',
        backgroundColor: '#0047AB',
    },

    eyeIcon: {
        padding: 10,
    },

    passwordInput: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingBottom: 20,
        paddingLeft: '10%',
    },

    logo: {
        width: '120%',
        height: '50%',
        resizeMode: "contain"
    },
})

export default LoginForm;
