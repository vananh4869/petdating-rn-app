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

const ProfileScreen = ({ navigation }) => {
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('open profile')
        });

        return unsubscribe;
    }, [navigation]);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>ProfileScreen</Text>
            <Button
                title='Go to Details'
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    );
};
export default ProfileScreen;