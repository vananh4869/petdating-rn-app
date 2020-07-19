import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import UserSettingScreen from './UserSettingScreen';
import AddPetScreen from './AddPetScreen';
import PetProfileScreen from './PetProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const PetStack = createStackNavigator();
const PetStackScreen = ({ navigation }) => (
    <PetStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#fff'
        },
        headerTitleAlign: 'center',
        headerTintColor: '#595a5a',
        headerTitleStyle: {
            // fontWeight: 'bold'
        }
    }}>
        <PetStack.Screen name="PetProfileScreen" component={PetProfileScreen} options={{
            title: 'Pet',
            headerLeft: () => (
                <Icon.Button name="arrow-back" size={24} color="#52575D" backgroundColor='#fff'
                    onPress={() => navigation.goBack()}></Icon.Button>
            )
        }} />
        <PetStack.Screen name='AddPetScreen' component={AddPetScreen} options={{
            title: 'Add Pet',
        }} />
    </PetStack.Navigator>
)
export default PetStackScreen;