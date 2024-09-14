import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import {storage} from "../../services/firebase";
import {ref, getDownloadURL} from "firebase/storage";
import { useEffect, useState } from 'react';
import {Image as ExpoImage} from 'expo-image';


export default function ListedItem({props}) {
    const [imgURL, setURL] = useState(null);
    const imageRef = ref(storage, props.imageRef);
    useEffect(() => {
        getDownloadURL(imageRef).then((url) => {
            setURL(url);
        }).catch((error) => {
            switch (error.code) {
                case 'storage/object-not-found':
                  console.log('object doesn\'t exist')
                    break;
                case 'storage/unauthorized':
                    console.log('user can\'t access file')
                    break;
                case 'storage/canceled':
                    console.log('download cancelled')
                    break;
                case 'storage/unknown':
                    console.log('unknown error')
                    break;
              }
        });
    }, [])
    return(
        <View style={styles.itemContainer}>
            {!imgURL && <ActivityIndicator/>}
            {
                imgURL && 
                (<ExpoImage source={{uri: imgURL}} style={styles.image} cachePolicy={'disk'} contentFit='contain'/>
                )
            }
            <Text style={styles.itemName}>{props.name}</Text>
            <Text style={styles.itemPrice}>${props.price}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        width: 200,
        height: 150,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderWidth: 0.2,
    },
    itemName: {
        fontSize: '20%',
        padding: '2%',
    },
    image: {
        flex: 1,
        aspectRatio: 1.5, 
    }
})