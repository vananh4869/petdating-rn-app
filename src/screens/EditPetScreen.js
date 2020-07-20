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
    FlatList,
    TextInput,
    Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { saveUser, addPet, updatePet } from '../actions/auth';
import { RadioButton } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import mime from 'mime';


const EditPetScreen = ({ route, navigation }) => {

    const { petInfo, petId } = route.params;

    const [data, setData] = useState({
        name: petInfo.name,
        gender: petInfo.gender,
        age: petInfo.age,
        weight: petInfo.weight,
        avatar: petInfo.avatar,
        breed: petInfo.breed,
        introduction: petInfo.introduction
    });
    const [uploadImg, setUploadImg] = useState({
        img: null
    });

    const [checked, setChecked] = useState(petInfo.gender === 1 ? 'Male' : 'Female');
    const [isChange, setIsChange] = useState(false);

    const dispatch = useDispatch();

    const uploadImgToServer = async () => {
        try {
            const formData = new FormData()
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

    const validatePet = () => {
        if (!data.avatar) {
            Alert.alert('Error', 'Avatar can not be empty')
            return false;
        }
        if (!data.name) {
            Alert.alert('Error', 'Name can not be empty')
            return false;
        }
        return true;
    }

    const onUpdatPet = async () => {
        if (isChange) {
            if (!validatePet()) return;
            // let age = data.age ? data.age : null;
            // let weight = data.weight ? data.weight : null;
            if (petInfo.avatar != data.avatar) {
                const newAvatar = await uploadImgToServer();
                Axios.put(`/pets/${petId}`, {
                    updateFields: {
                        ...data,
                        // age: age,
                        // weight: weight,
                        avatar: newAvatar
                    }
                })
                    .then(res => {
                        console.log('cc:', res.data)
                        dispatch(updatePet(res.data.data))
                        setIsChange(false)
                    })
                    .catch(error => console.error(error));
            } else {
                Axios.put(`/pets/${petId}`, {
                    updateFields: {
                        ...data,
                        // age: age,
                        // weight: weight,
                    }
                })
                    .then(res => {
                        console.log('cc:', res.data)
                        dispatch(updatePet(res.data.data))
                        setIsChange(false)
                    })
                    .catch(error => console.error(error));
            }
        }

        navigation.navigate('PetProfileScreen', { petId: petId })
    }

    const handleInfo = (field, value) => {
        setData({
            ...data,
            [field]: value
        });
        setIsChange(petInfo[field] != value);
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
                        <Text style={styles.textInputTitle}>Age</Text>
                        <TextInput
                            keyboardType="numeric"
                            value={data.age == null ? '' : `${data.age}`}
                            onChangeText={txt => handleInfo('age', txt)}
                            style={styles.textInput}
                        />
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.textInputTitle}>Weight</Text>
                        <TextInput
                            keyboardType="numeric"
                            value={data.weight == null ? '' : `${data.weight}`}
                            onChangeText={txt => handleInfo('weight', txt)}
                            style={styles.textInput}
                        />
                    </View>
                    <View style={[styles.userInfo, { paddingBottom: 30 }]}>
                        <Text style={styles.textInputTitle}>Introduction</Text>
                        <TextInput
                            placeholder='something about your pet ...'
                            value={data.introduction}
                            onChangeText={txt => handleInfo('introduction', txt)}
                            style={styles.textInput}
                        />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack()
                            }}
                            style={[styles.btn, { backgroundColor: '#fff', paddingRight: 5 }]}
                        >
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onUpdatPet}
                            style={[styles.btn, { backgroundColor: '#05a98b', paddingRight: 5 }]}
                        >
                            <Text style={{ color: '#fff' }}>SAVE</Text>
                        </TouchableOpacity>

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
        marginHorizontal: 16,
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
        paddingTop: 20
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
    },
    btn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flex: 1,
    }
});
export default EditPetScreen;