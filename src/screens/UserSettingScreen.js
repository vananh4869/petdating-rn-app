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
import { updateUser } from '../actions/auth';
import ImagePicker from 'react-native-image-picker';
import mime from 'mime';

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
                setIsChange(false)
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

    const handleUploadPicture = () => {
        let options = {
            title: 'Select Image',
            noData: true,
            maxWidth: 500,
            maxHeight: 500,
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else {
                const img = {
                    uri: response.uri,
                    type: mime.getType(response.uri),
                    name:
                        response.fileName ||
                        response.uri.substr(response.uri.lastIndexOf('/') + 1)
                }
                const formData = new FormData()
                formData.append('file', img)
                formData.append("upload_preset", "PetDating")
                formData.append("cloud_name", "anhtv4869")
                fetch('https://api.cloudinary.com/v1_1/anhtv4869/image/upload', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        // setInfo({ avatar: data.url })
                        setData({
                            ...data,
                            avatar: res.url
                        })
                        setIsChange(true)
                        console.log('Hello:', res)
                    }).catch(e => {
                        console.error(e)
                    })
            }
        });
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
                        <Image source={data.avatar ? { uri: data.avatar } : require('../../assets/avatar.jpg')} style={styles.image} resizeMode="cover"></Image>
                    </View>
                    <View style={styles.add}>
                        <TouchableOpacity onPress={handleUploadPicture}>
                            <Icon name="camera" size={48} color="#DFD8C8"></Icon>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.userContainer}>
                    <View style={styles.userInfo}>
                        <Feather name='user' style={styles.icon} size={20} />
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
                        <Feather name='phone' style={styles.icon} size={20} />
                        <TextInput
                            placeholder='Phone'
                            keyboardType="numeric"
                            value={data.phone}
                            onChangeText={txt => handleInfo('phone', txt)}
                            style={styles.textInput}
                        />
                    </View>
                    <View style={styles.userInfo}>
                        <FontAwesome name='birthday-cake' style={styles.icon} size={20} />
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
    },
    userContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 30,
    },
    textInput: {
        flex: 9,
        // marginBottom: 5,
        fontFamily: "HelveticaNeue",
        color: "#52575D",
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray'
    },
    icon: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 15,
    }
});
export default UserSettingScreen;