import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, Image, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { LoginBox } from './LoginBox';

const itemWidth = (Dimensions.get('window').width)

export function LoginScreen()
{
  return(
      <View style={styles.container}>
        
        <Image
        style={styles.logo}
        source={
          require('C:/Users/Tesold/Documents/JS/ReactNikorApp/assets/images/logoW.png')
        }
        />
        <LoginBox />
        <StatusBar style="auto" />
        
      </View>
        )
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#228B22',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo:
    {
      marginTop:itemWidth*0.3,
      width: itemWidth*0.5,
      height: itemWidth*0.5
    }
  });

