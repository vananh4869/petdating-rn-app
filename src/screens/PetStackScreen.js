import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import UserSettingScreen from './UserSettingScreen';
import ProfileScreen from './ProfileScreen';
import AddPetScreen from './AddPetScreen';

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
        {/* <PetStack.Screen name="Pet" component={ProfileScreen} options={{
            title: 'Pet',
        }} /> */}
        <PetStack.Screen name='AddPetScreen' component={AddPetScreen} options={{
            title: 'Add Pet',
        }} />
    </PetStack.Navigator>
)
export default PetStackScreen;