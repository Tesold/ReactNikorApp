import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LoginBox } from './LoginBox';

const itemWidth = (Dimensions.get('window').width)

export function LoginScreen(props:any)
{

  return(
    
    <KeyboardAvoidingView keyboardVerticalOffset={-40} contentContainerStyle={styles.container} behavior={Platform.OS==='ios'?'padding':'height'} style= {styles.container}>
        <View>

        </View>
        <Image
        style={styles.logo}
        resizeMode='contain'
        source={
          require('C:/Users/Tesold/Documents/JS/ReactNikorApp/assets/images/logoW.png')
        }
        />
        <LoginBox />
        <StatusBar style="auto" />
        
      </KeyboardAvoidingView>

        )
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#77A75C',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo:
    {
      
      marginTop:itemWidth*0.3,
      width: itemWidth*0.5,
      height: itemWidth*0.5,
      marginBottom:5,
      
    }
  });

