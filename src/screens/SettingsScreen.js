import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
} from 'react-native';

const SettingsScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>SettingsScreen</Text>
            <Button
                title='Go to Details'
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    );
};
export default SettingsScreen;