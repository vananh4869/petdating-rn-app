import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { saveUser } from '../actions/auth';

const ProfileScreen = ({ navigation }) => {

    const user = useSelector(state => state.auth.user);
    const pets = useSelector(state => state.auth.pets);
    // const dispatch = useDispatch();

    // React.useEffect(() => {
    //     console.log('profile')
    //     const getUserInfo = async () => {
    //         Axios.get('/users/currentUser')
    //             .then(res => {
    //                 console.log(res.data)
    //                 dispatch(addUser(res.data[0]));
    //             })
    //             .catch(error => console.log(error))
    //     }
    //     getUserInfo()
    // }, []);

    // const onAddPet = () => {

    // }

    const renderList = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('PetStackScreen', {
                        screen: 'PetProfileScreen',
                        params: {
                            petId: item.id
                        }
                    })
                }}
            >
                <View style={styles.mediaImageContainer}>
                    <Image source={item.avatar ? { uri: item.avatar } : require('../../assets/avatar.jpg')} style={styles.image} resizeMode="cover" />

                </View ></TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignSelf: "center", paddingTop: 20 }}>
                    <View style={styles.profileImage}>
                        <Image source={user.avatar ? { uri: user.avatar } : require('../../assets/avatar.jpg')} style={styles.image} resizeMode="cover"></Image>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{user.name}</Text>
                    </View>

                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{user.email}</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>{pets.length}</Text>
                        <Text style={[styles.text, styles.subText]}>Pets</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>302</Text>
                        <Text style={[styles.text, styles.subText]}>Matches</Text>
                    </View>
                </View>

                <View style={{ marginTop: 32, minHeight: 100 }}>
                    <FlatList
                        horizontal={true}
                        data={pets}
                        renderItem={renderList}
                        keyExtractor={item => `${item.id}`}
                        refreshing={true}
                    />
                    <View style={styles.mediaCount}>
                        <TouchableOpacity onPress={() => { navigation.navigate('PetStackScreen', { screen: 'AddPetScreen' }) }}>
                            <Icon name="add" size={50} color="#fff" ></Icon>
                        </TouchableOpacity>
                    </View>

                </View>
                <Text style={[styles.subText, styles.recent]}>More Information</Text>
                <View style={{ alignItems: "center", marginLeft: 50 }}>
                    {user.phone &&
                        <View style={styles.recentItem}>
                            <Text style={{ flex: 1, color: "#AEB5BC" }}>Phone:</Text>
                            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14, flex: 3 }]}>{user.phone}</Text>
                        </View>
                    }
                    {user.birth_date &&
                        <View style={styles.recentItem}>
                            <Text style={{ flex: 1, color: "#AEB5BC" }}>Birthday:</Text>
                            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14, flex: 3 }]}>{user.birth_date}</Text>
                        </View>
                    }
                    {user.gender !== null &&
                        <View style={styles.recentItem}>
                            <Text style={{ flex: 1, color: "#AEB5BC" }}>Gender:</Text>
                            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14, flex: 3 }]}>{user.gender === 1 ? 'Male' : 'Female'}</Text>
                        </View>
                    }

                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: 200,
        width: 200
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden",
        borderWidth: 4,
        borderColor: '#FF1',
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 0,
        left: 10,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 50,
        marginTop: 32,
        marginBottom: 6,
        paddingBottom: 10,
        fontSize: 16
    },
    recentItem: {
        flexDirection: "row",
        marginBottom: 10,
        flex: 1
    },
    activityIndicator: {
        // backgroundColor: "#CABFAB",
        padding: 4,
        // height: 12,
        // width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    }
});
export default ProfileScreen;