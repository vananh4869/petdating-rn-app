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
import { RadioButton } from 'react-native-paper';

const UserSettingScreen = ({ route, navigation }) => {
    const { userInfo } = route.params;

    const [data, setData] = useState({
        name: userInfo.name,
        gender: userInfo.gender,
        birth_date: userInfo.birth_date,
        phone: userInfo.phone,
        avatar: userInfo.avatar
    });
    const [isChange, setIsChange] = useState(false);
    const [uploadImg, setUploadImg] = useState({
        img: null
    });

    const [checked, setChecked] = React.useState(userInfo.gender === 1 ? 'Male' : 'Female');


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

    const uploadImgToServer = async () => {
        try {
            const formData = new FormData()
            console.log(uploadImg.img)
            formData.append('file', uploadImg.img)
            formData.append("upload_preset", "PetDating")
            formData.append("cloud_name", "anhtv4869")
            const response = await fetch('https://api.cloudinary.com/v1_1/anhtv4869/image/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            });
            const res = await response.json();
            return res.url;
        } catch (error) {
            console.error(error)
        }
    }

    const onUpdateUser = async () => {

        if (userInfo.avatar != data.avatar) {
            const newAvatar = await uploadImgToServer();
            console.log('start', newAvatar)
            Axios.put('/users', {
                updateFields: {
                    ...data,
                    avatar: newAvatar
                }
            })
                .then(res => {
                    console.log('cc:', res.data)
                    dispatch(updateUser(data))
                    setIsChange(false)
                })
                .catch(error => console.error(error));
        } else {
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
        }
        navigation.goBack();
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
                setUploadImg({ img: img });
                setData({ ...data, avatar: img.uri })
                setIsChange(true)
            }
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBar}>

                </View>
                <View style={{ alignSelf: "center", paddingTop: 20 }}>
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
                        <Text style={styles.textInputTitle}>Name</Text>
                        <TextInput
                            placeholder='Name'
                            value={data.name}
                            onChangeText={txt => handleInfo('name', txt)}
                            style={styles.textInput}
                        />
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.textInputTitle}>Gender</Text>
                        <View style={styles.radioContaier}>
                            <View style={styles.radioBtn}>
                                <RadioButton
                                    value="Male"
                                    status={checked === 'Male' ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked('Male');
                                        handleInfo('gender', 1);
                                    }}
                                />
                                <Text style={styles.radioText}>Male</Text>
                            </View>
                            <View style={styles.radioBtn}>
                                <RadioButton
                                    value="Female"
                                    status={checked === 'Female' ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked('Female');
                                        handleInfo('gender', 0);
                                    }}
                                /><Text style={styles.radioText}>Female</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.textInputTitle}>Phone</Text>
                        <TextInput
                            placeholder='Phone'
                            keyboardType="numeric"
                            value={data.phone}
                            onChangeText={txt => handleInfo('phone', txt)}
                            style={styles.textInput}
                        />
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.textInputTitle}>Birthday</Text>
                        <TextInput
                            placeholder='YYYY-MM-DD'
                            value={data.birth_date}
                            onChangeText={txt => handleInfo('birth_date', txt)}
                            style={styles.textInput}
                        />
                    </View>
                    {isChange &&
                        <View style={styles.userInfo}>
                            <Button
                                onPress={onUpdateUser}
                                title='Save'
                            />
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
        backgroundColor: "#FFF",
    },
    image: {
        flex: 1,
        height: 200,
        width: 200
    },
    titleBar: {
        // flexDirection: "row",
        // justifyContent: "flex-end",
        // marginTop: 24,
        // marginHorizontal: 16
        position: 'absolute',
        right: 10,

    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden",
        borderWidth: 4,
        borderColor: '#FF1'
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
        flexDirection: 'column',
        paddingTop: 10
    },
    userContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 30,
    },
    textInputTitle: {
        color: '#AEB5BC',
        fontSize: 12,
    },
    textInput: {
        // flex: 9,
        // marginBottom: 5,
        fontFamily: "HelveticaNeue",
        color: "#52575D",
        borderBottomWidth: 1,
        borderBottomColor: '#AEB5BC',
        padding: 0,
        height: 30
    },
    icon: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 15,
    },
    radioContaier: {
        flexDirection: 'row',
        alignContent: 'space-between',
        flex: 1
    },
    radioBtn: {
        flex: 1,
        flexDirection: 'row'
    },
    radioText: {
        marginTop: 10
    }
});
export default UserSettingScreen;