import {Text, View, StyleSheet, FlatList } from "react-native";
import ListedItem from "../common/listedItem";
import { Item, itemConverter } from "../../services/item";
import { useEffect, useState } from "react";
import { auth, db } from "../../services/firebase.js";
import { getDocs , collection, limit, query, startAfter, orderBy} from "firebase/firestore";

export default function Dashboard({navigation, route}) {
    const user = route.params.user;
    const [items, setItems] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [lastVisible, setLastVisible] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const collegeCollection = collection(db, user.college).withConverter(itemConverter);

    useEffect(() => {
        getItems();
    }, []);

    async function getItems(isRefresh = false) {
        setLoading(true);

        let q = query(collegeCollection, orderBy("itemId"), limit(10));

        // If not refreshing, fetch more items after the last visible
        if (!isRefresh && lastVisible != null) {
            q = query(collegeCollection, orderBy("itemId"), startAfter(lastVisible), limit(10));
        }
        
        try {
            const snapshot = await getDocs(q);
            
            if (!snapshot.empty) {
                const newItems = snapshot.docs.map(doc => doc.data());
                
                // Update the lastVisible document
                setLastVisible(snapshot.docs[snapshot.docs.length - 1]);

                // Refreshing: reset the Set with fresh data, otherwise append
                setItems(prevItems => {
                    const updatedSet = isRefresh ? new Set(newItems) : new Set([...Array.from(prevItems), ...newItems]);
                    return updatedSet;
                });
            } else {
                setLastVisible(null); // No more items to fetch
            }
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
            if (isRefresh) setIsRefreshing(false);
        }
    }

    const handleRefresh = () => {
        // Reset items and lastVisible when refreshing
        setIsRefreshing(true);
        setLastVisible(null);
        getItems(true); // true indicates that it's a refresh
    };

    const handleLoadMore = () => {
        if (!loading && lastVisible && items.size > 9) {
            getItems();
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.title}> Listings</Text>
            {
                loading ? (
                    <Text style={styles.text}>Loading...</Text>
                ) : error ? (
                    <Text style={styles.text}>Error</Text>
                ) : (
                    <FlatList
                        data={Array.from(items)}
                        renderItem={({ item }) => <ListedItem props={item} />}
                        keyExtractor={item => item.itemId}
                        numColumns={2}
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.75}
                        removeClippedSubviews={true}
                        ListEmptyComponent={!loading && <Text styles={styles.text}>No items available</Text>} // Handle empty state
                    />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    title: {
        alignSelf: 'center',
        fontSize: '20%',
        textDecorationLine: 'underline',
        margin: '5%',
    },
    
    text: {
        alignSelf: 'center',
        fontSize: '20%',
        marginTop: '50%',
    }
})