import React, {useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import SelectDropdown from 'react-native-select-dropdown';

export default function Signup({navigation}) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [college, setCollege] = useState('');
    const [passwordSecure, seePassword] = useState(true);
    const colleges = ["UMN - Twin Cities"]

    function togglePassword() {
        seePassword(visibility => !visibility);
        console.log(fullName + ", " + email + ", " + "password" + ", " + college);
    }

    return (
        <View>
            <View style={styles.signupForm}>
                <Text style={styles.signupWarning}>
                    <Text style={{color: 'red', textAlign: 'center'}}> WARNING {'\n'}</Text>
                    Please use a valid college email ending with "<Text style={{fontWeight: 'bold'}}> .edu </Text>"
                    to sign up. {'\n\n'}
                    Contact us if your college is not on this list.
                </Text>
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
                        <Ionicons name={passwordSecure ? "eye-off-outline" : "eye-outline"} size={25}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.buttons}>
                    <Text style={styles.text}>SIGNUP</Text>
                </TouchableOpacity>
            </View>
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

    selection: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        width: '60%',
        height: '6%',
        padding: 0,
    },

    signupForm: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    eyeIcon: {
        padding: 0,
        marginLeft: 'auto',
    },

    textInput: {
        flexDirection: 'row',
        width: '60%',
        height: '6%',
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        marginTop: '5%',
    },

    text: {
        fontWeight: 'bold',
        color: 'white',
    },

    buttons: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        height: '6%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        marginTop: '10%',
        backgroundColor: '#0047AB',
    },
})
