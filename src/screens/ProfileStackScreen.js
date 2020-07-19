import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import UserSettingScreen from './UserSettingScreen';
import PetProfileScreen from './PetProfileScreen';
import AddPetScreen from './AddPetScreen';

const ProfileStack = createStackNavigator();
const ProfileStackScreen = ({ navigation }) => (
    <ProfileStack.Navigator headerMode='none' >
        <ProfileStack.Screen name="UserSetting" component={UserSettingScreen} />
        <ProfileStack.Screen name="PetProfileScreen" component={PetProfileScreen} />
        <ProfileStack.Screen name="AddPetScreen" component={AddPetScreen} />
    </ProfileStack.Navigator >
)
export default ProfileStackScreen;