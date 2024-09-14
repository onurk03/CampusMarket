import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import SelectDropdown from 'react-native-select-dropdown';
import { auth, db } from "../../services/firebase.js";
import { User, userConverter } from "../../services/user.js";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";

export default function SignUp({navigation}) {
    // User info
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [college, setCollege] = useState('');

    // User info validation
    const [passwordSecure, seePassword] = useState(true);
    const [falseEmail, emailWarning] = useState(false);
    const [falseUserName, userNameWarning] = useState(false);
    const [falsePassword, passwordWarning] = useState(false);
    const [falseCollege, collegeWarning] = useState(false);
    const [existingUser, existingUserWarning] = useState(false);

    const colleges = ["UW-Madison", "Edgewood"]

    /**
     * Toggles visibility of password
     */
    function togglePassword() {
        seePassword(visibility => !visibility);
    }

    /**
     * Handles user registration
     */
    async function signUp() {
        if (!validateInfo()) {
            console.log("Invalid inputs");
            return;
        }

        let user;
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            user = userCredential.user;
            try {
                const userRef = doc(db, "users", `${user.uid}`).withConverter(userConverter);
                await setDoc(userRef, new User(fullName, college));
                updateProfile(user, {
                    displayName: fullName
                }).then(() => {
                    console.log("User display name updated");
                }).catch((err) => {
                    console.log("Couldn't update user display name.");
                });
                navigation.replace("SignUpSuccess");
            } catch (e) {
                console.error(e);
            }

            sendEmailVerification(auth.currentUser).then(() => {
                console.log("Email verification sent!");
            });
        }).catch((error) => {
            if(error.code.trim() === "auth/email-already-in-use") {
                existingUserWarning(warning => warning = true);
            } else {
                existingUserWarning(warning => warning = false);
            }
            console.log(error.code);
            throw error;
        });
    }

    /**
     * Validates that correct input are provided for user creation
     * @returns {boolean}
     */
    function validateInfo() {
        if(fullName.trim() === "") {
            userNameWarning(warning => warning = true);
            return false;
        } else if(falseUserName === true) {
            userNameWarning(warning => !warning);
        }

        if(!email.endsWith(".edu")) {
            emailWarning(warning => warning = true);
            return false;
        } else if(falseEmail === true) {
            emailWarning(warning => !warning);
        }

        if(password.trim() === "") {
            passwordWarning(warning => warning = true);
            return false;
        } else if(falsePassword === true) {
            passwordWarning(warning => !warning);
        }

        if(college.trim() === "") {
            collegeWarning(warning => warning = true);
            return false;
        } else if(falseCollege === true) {
            collegeWarning(warning => !warning);
        }

        return true;
    }

    return (
        <View>
            <KeyboardAvoidingView behavior='height' style={styles.signupForm}>
                <Text style={styles.signupWarning}>
                    Please use a valid college email ending with "<Text style={{fontWeight: 'bold'}}> .edu </Text>"
                    to sign up. {'\n\n'}
                    Contact us if your college is not on this list.
                </Text>
                <TextInput
                    placeholder={'Full Name'}
                    onChangeText={setFullName}
                    style={styles.textInput}
                    textContentType={"name"}
                    autoCorrect={"none"}
                    autoCapitalize={"words"}
                    spellCheck={"false"}
                />
                <TextInput
                    placeholder={'Email'}
                    onChangeText={setEmail}
                    style={styles.textInput}
                    textContentType={"emailAddress"}
                    keyboardType={"email-address"}
                    autoCorrect={"none"}
                    autoCapitalize={"none"}
                    spellCheck={"false"}
                />
                <View
                    style={styles.textInput}>
                    <TextInput
                        placeholder={'Password'}
                        style={{width: '100%'}}
                        onChangeText={setPassword}
                        secureTextEntry={passwordSecure}
                        textContentType={"password"}
                        autoCorrect={"none"}
                        autoCapitalize={"none"}
                        spellCheck={"false"}
                    />
                    <TouchableOpacity style={styles.eyeIcon} onPress={togglePassword}>
                        <Ionicons name={passwordSecure ? "eye-outline" : "eye-off-outline"} size={25}/>
                    </TouchableOpacity>
                </View>
                <SelectDropdown
                    defaultButtonText={'Select your college'}
                    buttonStyle={styles.selection}
                    buttonTextStyle={{fontSize: 15, padding: 0}}
                    data={colleges}
                    onSelect={(selectedItem, index) => {
                        setCollege(selectedItem);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                    search
                    searchInputStyle={{borderBottomWidth: 1}}
                    searchPlaceHolder={'Search here'}
                    searchPlaceHolderColor={'grey'}
                    renderSearchInputLeftIcon={() => {
                        return <Ionicons name={'search'} color={'#444'} size={18} />;
                    }}
                />
                {
                    falseUserName &&
                    <Text style={styles.inputWarning}> Please enter your full name</Text>
                }
                {
                    falseEmail &&
                    <Text style={styles.inputWarning}> Please use an email ending with ".edu"</Text>
                }
                {
                    falsePassword &&
                    <Text style={styles.inputWarning}> Please enter a password</Text>
                }
                {
                    falseCollege &&
                    <Text style={styles.inputWarning}> Please select your college</Text>
                }
                {
                    existingUser &&
                    <Text style={styles.inputWarning}> This email is already registered! </Text>
                }
                <TouchableOpacity
                    onPress={signUp}
                    style={styles.buttons}>
                    <Text style={styles.text}>SIGN UP</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({

    signupWarning: {
        fontFamily: 'AlNile-Bold',
        borderWidth: 2,
        borderRadius: 20,
        marginBottom: '10%',
        width: '80%',
        padding: '5%',
        lineHeight: 20,
    },

    inputWarning: {
        marginTop: '5%',
        color: 'red',
        fontWeight: 'bold',
    },

    selection: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        width: '60%',
        height: '8%',
        padding: 0,
    },

    signupForm: {
        height: '95%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    eyeIcon: {
        padding: 0,
        marginLeft: 'auto',
        alignSelf: 'center',
    },

    textInput: {
        flexDirection: 'row',
        width: '60%',
        height: '8%',
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: '5%',
    },

    text: {
        fontWeight: 'bold',
        color: 'white',
    },

    buttons: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        height: '7%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        marginTop: '5%',
        backgroundColor: '#0047AB',
    },
})
