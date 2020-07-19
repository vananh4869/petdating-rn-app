import Axios from 'axios';
import mime from 'mime';
import React, { useState } from 'react';
import {
    Image, SafeAreaView,
    ScrollView, StyleSheet,
    TextInput, TouchableOpacity, View, Text
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { updateUser } from '../actions/auth';



const PetProfileScreen = ({ route, navigation }) => {
    const { petId } = route.params;

    const [data, setData] = useState({});
    // const [isChange, setIsChange] = useState(false);


    // const dispatch = useDispatch();

    React.useEffect(() => {
        console.log('PET INFO')
        const getPetInfo = async () => {
            Axios.get(`/pets/${petId}`)
                .then(res => {
                    console.log(res.data[0])
                    const pet = res.data[0];
                    setData({
                        name: pet.name,
                        gender: pet.gender,
                        breed: pet.breed,
                        age: pet.age,
                        weight: pet.weight,
                        avatar: pet.avatar,
                        introduction: pet.introduction,
                    })
                })
                .catch(error => console.log(error))
        }
        getPetInfo()
    }, [petId]);

    // const onUpdateUser = () => {
    //     console.log(data)
    //     Axios.put('/users', {
    //         updateFields: {
    //             ...data
    //         }
    //     })
    //         .then(res => {
    //             console.log(res.data)
    //             dispatch(updateUser(data))
    //             setIsChange(false)
    //         })
    //         .catch(error => console.error(error));
    //     navigation.navigate('Profile')
    // }

    // const handleInfo = (field, value) => {
    //     setData({
    //         ...data,
    //         [field]: value
    //     });
    //     setIsChange(userInfo[field] != value);
    // }

    // const handleUploadPicture = () => {
    //     let options = {
    //         title: 'Select Image',
    //         noData: true,
    //         maxWidth: 500,
    //         maxHeight: 500,
    //     };
    //     ImagePicker.showImagePicker(options, (response) => {
    //         console.log('Response = ', response);

    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else {
    //             const img = {
    //                 uri: response.uri,
    //                 type: mime.getType(response.uri),
    //                 name:
    //                     response.fileName ||
    //                     response.uri.substr(response.uri.lastIndexOf('/') + 1)
    //             }
    //             const data = new FormData()
    //             data.append('file', img)
    //             data.append("upload_preset", "PetDating")
    //             data.append("cloud_name", "anhtv4869")
    //             fetch('https://api.cloudinary.com/v1_1/anhtv4869/image/upload', {
    //                 method: 'POST',
    //                 body: data,
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'multipart/form-data'
    //                 }
    //             })
    //                 // .then(res => res.json())
    //                 .then(res => {
    //                     // setInfo({ avatar: data.url })
    //                     setData({
    //                         ...data,
    //                         avatar: res.url
    //                     })
    //                     console.log(res)
    //                 }).catch(e => {
    //                     console.error(e)
    //                 })
    //         }
    //     });
    // }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignSelf: "center", paddingTop: 20 }}>
                    <View style={styles.profileImage}>
                        <Image source={data.avatar ? { uri: data.avatar } : require('../../assets/avatar.jpg')} style={styles.image} resizeMode="cover"></Image>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{data.name}</Text>
                    </View>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, styles.subText]}>Age</Text>
                        <Text style={[styles.text, { fontSize: 24 }]}>{data.age}</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, styles.subText]}>Weight</Text>
                        <Text style={[styles.text, { fontSize: 24 }]}>{data.weight}</Text>
                    </View>
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, styles.subText]}>Gender</Text>
                        <Text style={[styles.text, { fontSize: 24 }]}>{data.gender == 1 ? 'male' : 'female'}</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, styles.subText]}>Breed</Text>
                        <Text style={[styles.text, { fontSize: 24 }]}>{data.breed}</Text>
                    </View>
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, styles.subText]}>Introduction</Text>
                        <Text style={[styles.text, { fontSize: 24 }]}>{data.introduction}</Text>
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
        marginTop: 0
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 20,
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
export default PetProfileScreen;