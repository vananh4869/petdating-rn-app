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

const ChatScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>ChatScreen</Text>
            <Button
                title='Go to Home'
                onPress={() => navigation.navigate('Home')}
            />
            <Button
                title='Go back'
                onPress={() => navigation.goBack()}
            />
        </View>
    );
};
export default ChatScreen;