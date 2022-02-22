import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {AppView} from './navigation/AppNavigation'
import { AuthProvider } from './context/AuthContext';
import React from 'react';
import { store } from './src/store/index';
import { Provider } from 'react-redux'

export default function App() {

  let [fontsLoaded] = useFonts({
    'OpenSans': require('./assets/fonts/OpenSans.ttf'),
  });;

  const styles = StyleSheet.create(
    {
      container:
      {
        flex: 1
      }
    }
  )

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    
    <Provider store = {store}>
    <NavigationContainer>
      <AppView />
    </NavigationContainer>
    </Provider>
    
  );
  
}


