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
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
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
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBar}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('ProfileStackScreen', {
                                screen: 'UserSetting',
                                params: {
                                    userInfo: user
                                }
                            })
                        }}
                    >
                        <Feather name="more-vertical" size={24} color="#52575D" ></Feather>
                    </TouchableOpacity>
                </View>
                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={{ uri: user.avatar ? user.avatar : require('../../assets/avatar.jpg') }} style={styles.image} resizeMode="stretch"></Image>
                    </View>
                    {/* <View style={styles.add}>
                        <Icon name="camera" size={48} color="#DFD8C8"></Icon>
                    </View> */}
                </View>

                <View style={styles.infoContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{user.name}</Text>
                        {/* <TouchableOpacity>
                            <MaterialIcons name='account-edit' size={30} style={{ marginTop: 7 }}></MaterialIcons>
                        </TouchableOpacity> */}
                    </View>

                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{user.email}</Text>
                    {user.phone && <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{user.phone}</Text>}
                    {user.gender && <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{user.gender == 1 ? 'Male' : 'Female'}</Text>}
                    {user.birth_date && <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{user.birth_date}</Text>}
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

                <View style={{ marginTop: 32 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../../assets/media1.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../../assets/media2.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../../assets/media3.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../../assets/media3.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../../assets/media3.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../../assets/media3.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                    </ScrollView>
                    <View style={styles.mediaCount}>
                        <TouchableOpacity onPress={() => setReload(!reload)}>
                            <Text>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
                <View style={{ alignItems: "center" }}>
                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                Started following <Text style={{ fontWeight: "400" }}>Jake Challeahe</Text> and <Text style={{ fontWeight: "400" }}>Luis Poteer</Text>
                            </Text>
                        </View>
                    </View>

                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                Started following <Text style={{ fontWeight: "400" }}>Luke Harper</Text>
                            </Text>
                        </View>
                    </View>
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
        overflow: "hidden"
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
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    }
});
export default ProfileScreen;