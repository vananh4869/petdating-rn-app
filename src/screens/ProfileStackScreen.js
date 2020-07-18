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

const ProfileStack = createStackNavigator();
const ProfileStackScreen = ({ navigation }) => (
    <ProfileStack.Navigator headerMode='none'>
        <ProfileStack.Screen name="UserSetting" component={UserSettingScreen} />
    </ProfileStack.Navigator >
)
export default ProfileStackScreen;