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
import PetProfileScreen from './PetProfileScreen';

const ProfileStack = createStackNavigator();
const ProfileStackScreen = ({ navigation }) => (
    <ProfileStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#009387'
        },
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }} >
        <ProfileStack.Screen name="UserSetting" component={UserSettingScreen} />
        <ProfileStack.Screen name="PetProfileScreen" component={PetProfileScreen} />
    </ProfileStack.Navigator >
)
export default ProfileStackScreen;