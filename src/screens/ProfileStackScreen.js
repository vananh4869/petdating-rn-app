import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import UserSettingScreen from './UserSettingScreen';
import ProfileScreen from './ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

const ProfileStack = createStackNavigator();
const ProfileStackScreen = ({ navigation }) => {
    const user = useSelector(state => state.auth.user);
    return (
        <ProfileStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#694fad'
            },
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
                // fontWeight: 'bold'
            }
        }}>
            <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{
                title: 'Profile',
                headerRight: () => (
                    <MaterialCommunityIcons.Button name='account-edit-outline' size={25} backgroundColor='#694fad' color='#fff'
                        onPress={() => navigation.navigate('UserSetting', { userInfo: user })}></MaterialCommunityIcons.Button>
                )
            }} />
            <ProfileStack.Screen name='UserSetting' component={UserSettingScreen} options={{
                title: 'Edit User',
            }} />
        </ProfileStack.Navigator>
    )
}
export default ProfileStackScreen;