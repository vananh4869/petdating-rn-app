/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import HomeScreen from './HomeScreen';
import ChatScreen from './ChatScreen';
import ProfileScreen from './ProfileScreen';
import ExploreScreen from './ExploreScreen';



const HomeStack = createStackNavigator();
const ChatStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const HomeStackScreen = ({ navigation }) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#009387'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
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
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
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
const ProfileStackScreen = ({ navigation }) => (
    <ProfileStack.Navigator screenOptions={{
        headerShown: false
    }}>
        <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
)

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
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
            name="Profile"
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

export default MainTabScreen;
