import React, { useState } from 'react';
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
    TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { saveUser, updateUser } from '../actions/auth';

const UserSettingScreen = ({ route, navigation }) => {
    const user = useSelector(state => state.auth.user);
    const { userInfo } = route.params;

    const [data, setData] = useState({
        name: userInfo.name,
        gender: userInfo.gender,
        birth_date: userInfo.birth_date,
        phone: userInfo.phone,
        avatar: userInfo.avatar
    });
    const [isChange, setIsChange] = useState(false);


    const dispatch = useDispatch();

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

    const onUpdateUser = () => {
        console.log(data)
        Axios.put('/users', {
            updateFields: {
                ...data
            }
        })
            .then(res => {
                console.log(res.data)
                dispatch(updateUser(data))
            })
            .catch(error => console.error(error));
        navigation.navigate('Profile')
    }

    const handleInfo = (field, value) => {
        setData({
            ...data,
            [field]: value
        });
        setIsChange(userInfo[field] != value);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBar}>
                    <TouchableOpacity
                        onPress={() => { navigation.goBack() }}
                    >
                        <Icon name="arrow-back" size={24} color="#52575D" ></Icon>
                    </TouchableOpacity>
                    {isChange && <TouchableOpacity
                        onPress={onUpdateUser}
                    >
                        <Icon name="checkmark-done" size={24} color="#52575D" ></Icon>
                    </TouchableOpacity>}
                </View>
                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={{ uri: data.avatar ? data.avatar : require('../../assets/avatar.jpg') }} style={styles.image} resizeMode="stretch"></Image>
                    </View>
                    <View style={styles.add}>
                        <Icon name="camera" size={48} color="#DFD8C8"></Icon>
                    </View>
                </View>

                <View style={styles.userContainer}>
                    <View style={styles.userInfo}>
                        <Feather name='user' />
                        <TextInput
                            placeholder='Name'
                            value={data.name}
                            onChangeText={txt => handleInfo('name', txt)}
                            style={styles.textInput}
                        />
                    </View>
                    {/* <View style={styles.userInfo}>
                        <Feather name='user' />
                        <TextInput
                            placeholder='Gender'
                            value={data.gender}
                            onChangeText={txt => handleInfo('gender', txt)}
                            style={styles.textInput}
                        />
                    </View> */}
                    <View style={styles.userInfo}>
                        <Feather name='phone' />
                        <TextInput
                            placeholder='Phone'
                            keyboardType="numeric"
                            value={data.phone}
                            onChangeText={txt => handleInfo('phone', txt)}
                            style={styles.textInput}
                        />
                    </View>
                    <View style={styles.userInfo}>
                        <FontAwesome name='birthday-cake' />
                        <TextInput
                            placeholder='Birth date'
                            value={data.birth_date}
                            onChangeText={txt => handleInfo('birth_date', txt)}
                            style={styles.textInput}
                        />
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
    image: {
        flex: 1,
        height: 200,
        width: 200
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
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
    userInfo: {
        flexDirection: 'row',
        height: 100
    },
    userContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 30,
    },
    textInput: {
        marginLeft: 10,
        marginBottom: 5,
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    }
});
export default UserSettingScreen;