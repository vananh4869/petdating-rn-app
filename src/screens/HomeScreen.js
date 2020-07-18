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

const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>HomeScreen</Text>
            <Button
                title='Go to Details'
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    );
};
export default HomeScreen;