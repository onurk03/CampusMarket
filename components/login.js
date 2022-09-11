import React, { useState } from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity, Image} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function LoginForm({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordSecure, seePassword ] = useState(true);

    function togglePassword() {
        seePassword(visibility => !visibility);
        console.log(email + ", " + password);
    }

    return(
        <View style={styles.container}>
            <View style = {styles.loginForm} >
                <Image
                    style={styles.logo}
                    source={require('../assets/logo.png')}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder={'Email'}
                        style={styles.textInput}
                        textContentType={"emailAddress"}
                        keyboardType={"email-address"}
                        autoCapitalize={"none"}
                        onChangeText={setEmail}
                    />
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder={'Password'}
                            style={{width: '100%'}}
                            secureTextEntry={passwordSecure}
                            textContentType={"password"}
                            autoCapitalize={"none"}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity style={styles.eyeIcon} onPress={togglePassword}>
                            <Ionicons name={passwordSecure ? "eye-outline" : "eye-off-outline"} size={25} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <Text> Forgot Password? </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style= {styles.buttons}>
                    <Text style={styles.text}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SignUp')}
                    style={styles.buttons}>
                    <Text style={styles.text}>SIGN UP</Text>
                </TouchableOpacity>
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

    loginForm: {
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

    text: {
        fontWeight: 'bold',
        color: 'white',
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

    eyeIcon: {
        padding: 0,
        marginLeft: 'auto',
    },

    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingBottom: '10%',
        paddingLeft: '10%',
    },

    logo: {
        width: '120%',
        height: '50%',
        resizeMode: "contain"
    },
})
