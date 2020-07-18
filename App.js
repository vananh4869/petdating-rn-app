/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import AsyncStorage from '@react-native-community/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, NavigationContainer } from '@react-navigation/native';
import Axios from 'axios';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { AuthContext } from './src/components/context';
import { DrawerContent } from './src/screens/DrawerContent';
import MainTabScreen from './src/screens/MainTabScreen';
import RootStackScreen from './src/screens/RootStackScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { Provider } from 'react-redux';
import store from './src/store';
import ProfileStackScreen from './src/screens/ProfileStackScreen';







Axios.defaults.baseURL = 'https://pet-dating-server.herokuapp.com/api/';

const Drawer = createDrawerNavigator();

const App = () => {

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        console.log('RETRIEVE_TOKEN');
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        console.log('LOGIN');
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        console.log('LOGOUT');
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        console.log('REGISTER');
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (userToken) => {

      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch (e) {
        console.log(e);
      }
      console.log('set auth', userToken)
      Axios.defaults.headers.common['Authorization'] = userToken;
      dispatch({ type: 'LOGIN', token: userToken });
    },
    signOut: async () => {
      console.log('signOut');
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
    },
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
    }
  }), []);

  useEffect(() => {
    setTimeout(async () => {
      console.log('useEffect');
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      console.log(userToken)
      if (userToken) {
        console.log('set auth')
        Axios.defaults.headers.common['Authorization'] = userToken;
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    console.log('isLoading');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer theme={theme}>
            {loginState.userToken !== null ? (
              <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
                <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
                <Drawer.Screen name="ProfileStackScreen" component={ProfileStackScreen} />
              </Drawer.Navigator>
            )
              :
              <RootStackScreen />
            }
          </NavigationContainer>
        </AuthContext.Provider>
      </PaperProvider>
    </Provider>
  );
}

export default App;
