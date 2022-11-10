import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import {userConverter} from "../user";
import {db} from "../firebase";

export default function Main({navigation}) {
    const auth = getAuth();
    const user = auth.currentUser;
    let userData;
    if(user) {
        const unsub = onSnapshot(doc(db, "users", user.uid).withConverter(userConverter), (doc) => {
            userData = doc.data();
        })
    } else {
        navigation.navigate('Login');
    }

    return(
        <View>
            <Text> Welcome `${userData}`</Text>
        </View>
    );
}
