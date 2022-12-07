import { useEffect, useState } from 'react';
import {Image, Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { User, userConverter } from "../user";
import { db } from "../firebase";

export default function Dashboard({navigation}) {
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

    return(
        <View style={styles.container}>
            {
                loading && 
                <Text> Loading... </Text>
            }
            {
                !loading &&
            <Text> Welcome {currUser.fullName}!!</Text>
            }
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
})