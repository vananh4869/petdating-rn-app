import { GoogleSignin } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import Axios from 'axios';
import React from 'react';
import {
    Alert, Platform,
    ScrollView, StatusBar, StyleSheet, Text,
    TextInput, TouchableOpacity, View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../components/context';
import { saveUser } from '../actions/auth';



GoogleSignin.configure({
    webClientId: '1066127115976-t88eq8fnvmm0vitbmutk8khc8qoqdb9b.apps.googleusercontent.com',
    offlineAccess: true
});
const SignInScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { colors } = useTheme();

    const { signIn } = React.useContext(AuthContext);

    // const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const textInputChange = (val) => {
        if (val.trim().length >= 6) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 6) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const onSingIn = () => {
        auth()
            .signInWithEmailAndPassword(data.email, data.password)
            .then((user) => {
                console.log('User account created & signed in!', user);
                return Axios.post('/register', { email: data.email })
            }).then(res => {
                const { pd_token } = res.data;
                console.log(res.data)
                dispatch(saveUser(res.data));
                signIn(pd_token);
            }).catch(error => {
                if (error.code === 'auth/wrong-password') {
                    Alert.alert('Error', 'The password is invalid or the user does not have a password!')
                }

                if (error.code === 'auth/invalid-email') {
                    Alert.alert('Error', 'That email address is invalid!')
                }

                if (error.code === 'auth/weak-password') {
                    Alert.alert('Error', 'Password should be at least 6 characters ')
                }

                console.error(error);
            });
    }


    const onLoginFacebook = () => {
        LoginManager.logInWithPermissions(['public_profile', 'email'])
            .then(result => {
                if (result.isCancelled) {
                    throw 'User cancelled the login process';
                }
                return AccessToken.getCurrentAccessToken();
            }).then(data => {
                const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
                return auth().signInWithCredential(facebookCredential);
            }).then(currentUser => {
                console.log('USER INFO:', currentUser.user)
                const { displayName, email, phoneNumber, photoURL } = currentUser.user;
                return Axios.post('/register', { name: displayName, email, phone: phoneNumber, avatar: photoURL })
            }).then(res => {
                const { pd_token } = res.data;
                console.log(res.data)
                dispatch(saveUser(res.data));
                signIn(pd_token);
            }).catch(error => {

                console.error(error)
                Alert.alert('Error', `Something's wrong`)
            })
    }

    const onLoginGoogle = () => {
        GoogleSignin.signIn()
            .then(result => {
                console.log(result)
                const { idToken } = result;
                const googleCredential = auth.GoogleAuthProvider.credential(idToken);
                return auth().signInWithCredential(googleCredential);
            }).then(currentUser => {
                console.log(currentUser)
            }).catch(err => console.log('Error:', err))
    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <ScrollView>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Email</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            placeholder="Your email"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                        />
                        {data.check_textInputChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>
                    {data.isValidUser ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>email must be 4 characters long.</Text>
                        </Animatable.View>
                    }


                    <Text style={[styles.text_footer, {
                        color: colors.text,
                        marginTop: 35
                    }]}>Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Password"
                            placeholderTextColor="#666666"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePasswordChange(val)}
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    {data.isValidPassword ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                        </Animatable.View>
                    }


                    <TouchableOpacity>
                        <Text style={{ color: '#009387', marginTop: 15 }}>Forgot password?</Text>
                    </TouchableOpacity>
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={onSingIn}
                        >
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Sign In</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignUpScreen')}
                            style={[styles.signIn, {
                                borderColor: '#009387',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#009387'
                            }]}>Sign Up</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={onLoginFacebook}
                            style={[styles.signIn, {
                                borderColor: '#009387',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#009387'
                            }]}>Login with Facebook</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onLoginGoogle}
                            style={[styles.signIn, {
                                borderColor: '#009387',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#009387'
                            }]}>Login with Google</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View >
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    footer: {
        flex: 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
