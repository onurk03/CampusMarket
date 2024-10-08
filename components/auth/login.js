import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity, Image} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default function LoginForm({ navigation }) {
    const auth = getAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordSecure, seePassword ] = useState(true);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [tooManyAttempts, setTooManyAttempts] = useState(false);
    const [needVerification, setVerification] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                if(user.emailVerified) {
                    navigation.replace("Main Page");
                }
            }
        });
    }, []);

    function togglePassword() {
        seePassword(visibility => !visibility);
    }

    function login() {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                if(auth.currentUser.emailVerified) {
                    navigation.replace("Main Page");
                } else {
                    setVerification((needVerification) => needVerification = true);
                }
                console.log("Login Success!!");
            })
            .catch((error) => {
                console.log(error.message);
                setVerification((needVerification) => needVerification = false);
                if(error.code == "auth/user-not-found" || error.code == "auth/invalid-email") {
                    setInvalidEmail((invalidEmail) => invalidEmail = true);
                } else if(error.code == "auth/wrong-password" || error.code == "auth/missing-password") {
                    setInvalidPassword((invalidPassword) => invalidPassword = true);
                } else if(error.code == "auth/too-many-requests") {
                    setTooManyAttempts((tooManyAttempts) => tooManyAttempts = true);
                }
            });
    }

    return(
        <View style={styles.container}>
            <View style = {styles.loginForm} >
                <Image
                    style={styles.logo}
                    source={require('../../assets/logo.png')}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder={'Email'}
                        style={styles.textInput}
                        textContentType={"emailAddress"}
                        keyboardType={"email-address"}
                        autoCapitalize={"none"}
                        onChangeText={(text) => {
                            setEmail(text);
                            setInvalidEmail(invalidEmail => invalidEmail = false);
                        }}
                    />
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder={'Password'}
                            style={{width: '100%'}}
                            secureTextEntry={passwordSecure}
                            textContentType={"password"}
                            autoCapitalize={"none"}
                            onChangeText={(text) => {
                                setPassword(text);
                                setInvalidPassword(invalidPassword => invalidPassword = false);
                            }}
                        />
                        <TouchableOpacity style={styles.eyeIcon} onPress={togglePassword}>
                            <Ionicons name={passwordSecure ? "eye-outline" : "eye-off-outline"} size={25} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Forgot Password')}>
                        <Text> Forgot Password? </Text>
                    </TouchableOpacity>
                </View>
                {
                    invalidEmail &&
                    <Text style={styles.inputWarning}> Invalid Email!</Text>
                }
                {
                    invalidPassword &&
                    <Text style={styles.inputWarning}> Invalid Password!</Text>
                }
                {
                    needVerification &&
                    <Text style={styles.inputWarning}> You need to verify your email! Check your inbox! </Text>
                }
                {
                    tooManyAttempts &&
                    <Text style={styles.inputWarning}> Too many attempts! Try again later or reset your password </Text>
                }
                <TouchableOpacity
                    onPress={login}
                    style= {styles.buttons}>
                    <Text style={styles.text}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Sign Up')}
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

    inputWarning: {
        marginTop: '5%',
        color: 'red',
        fontWeight: 'bold',
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
