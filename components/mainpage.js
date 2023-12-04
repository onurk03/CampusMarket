import { getAuth } from "firebase/auth";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { userConverter } from "../user";
import { db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";
import Dashboard from "./dashboard";
import UserInfo from "./userInfo";
import Chats from "./chats";

export default function MainPage({ navigation }) {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    const auth = getAuth();
    const user = auth.currentUser;
    const [currUser, setCurrUser] = useState();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        getUserData();
    }, []);

    async function getUserData() {
        const docRef = doc(db, "users", user.uid).withConverter(userConverter);
        const docSnap = await getDoc(docRef).catch((error) => console.log(error.message));
        if(docSnap.exists()) {
            setCurrUser(docSnap.data());
            setLoading((loading) => loading = false);
        } else {
            console.log("no such doc");
        }
    }

    if(loading) {
        return(
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    } else {
        return (
        <Tab.Navigator
            initialRouteName={"Dashboard"}
            screenOptions={
                ({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if(rn == "Dashboard") {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (rn == "User") {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (rn == "Chats") {
                        iconName = focused ? 'chatbox' : 'chatbox-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>
                }
            })}
        >
            <Tab.Screen
                name="User"
                component={UserInfo}
                initialParams={{ user: currUser }}
            />
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                initialParams={{ user: currUser }}
            />
            <Tab.Screen
                name="Chats"
                component={Chats}
                initialParams={{ user: currUser }}
            />
        </Tab.Navigator>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})