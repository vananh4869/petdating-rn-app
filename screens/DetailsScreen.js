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

const DetailsScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>DetailsScreen</Text>
            <Button
                title='Go to Home'
                onPress={() => navigation.navigate('Home')}
            />
            <Button
                title='Go to Details again'
                onPress={() => navigation.push('Details')}
            />
            <Button
                title='Go back'
                onPress={() => navigation.goBack()}
            />
            <Button
                title='Go to firstScreen'
                onPress={() => navigation.popToTop()}
            />
        </View>
    );
};
export default DetailsScreen;