/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ChatScreen from './ChatScreen';
import ExploreScreen from './ExploreScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { saveUser, savePets } from '../actions/auth';
import UserSettingScreen from './UserSettingScreen';
import ProfileStackScreen from './ProfileStackScreen';





const HomeStack = createStackNavigator();
const ChatStack = createStackNavigator();

const HomeStackScreen = ({ navigation }) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#009387'
        },
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerTitleStyle: {
            // fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen}
            options={{
                title: 'Overview',
                headerLeft: () => (
                    <Icon.Button name='md-menu' size={25} backgroundColor='#009387'
                        onPress={() => navigation.openDrawer()}></Icon.Button>
                )
            }} />
    </HomeStack.Navigator>
)

const ChatStackScreen = ({ navigation }) => (
    <ChatStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#1f65ff'
        },
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerTitleStyle: {
            // fontWeight: 'bold'
        }
    }}>
        <ChatStack.Screen name="Chat" component={ChatScreen} options={{
            title: 'Chat',
            headerLeft: () => (
                <Icon.Button name='md-menu' size={25} backgroundColor='#1f65ff'
                    onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </ChatStack.Navigator>
)




const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {

    // const user = useSelector(state => state.auth.user);
    // const pets = useSelector(state => state.auth.pets);
    const dispatch = useDispatch();

    React.useEffect(() => {
        console.log('get user info')
        const getUserInfo = async () => {
            Axios.get('/users/currentUser')
                .then(res => {
                    console.log(res.data)
                    dispatch(saveUser(res.data[0]));
                })
                .catch(error => console.log(error))
        }
        getUserInfo()
    }, []);

    React.useEffect(() => {
        console.log('get pets info')
        const getPetsInfo = async () => {
            Axios.get('/pets')
                .then(res => {
                    console.log(res.data)
                    dispatch(savePets(res.data));
                })
                .catch(error => console.log(error))
        }
        getPetsInfo()
    }, []);

    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#fff"
        >
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarColor: '#009387',
                    tabBarIcon: ({ color }) => (
                        <Icon name="md-home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="ProfileStack"
                component={ProfileStackScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarColor: '#694fad',
                    tabBarIcon: ({ color }) => (
                        <Icon name="md-person" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="ChatStackScreen"
                component={ChatStackScreen}
                options={{
                    tabBarLabel: 'Chat',
                    tabBarColor: '#1f65ff',
                    tabBarIcon: ({ color }) => (
                        <Icon name="md-chatbox-ellipses" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Explore"
                component={ExploreScreen}
                options={{
                    tabBarLabel: 'Explore',
                    tabBarColor: '#d02860',
                    tabBarIcon: ({ color }) => (
                        <Icon name="md-search" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default MainTabScreen;
