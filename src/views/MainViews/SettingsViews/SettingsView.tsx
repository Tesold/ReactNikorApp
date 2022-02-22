
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch } from '../../../store/hooks';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#228B22',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export function SettingsScreen()
{
    const dispatch = useAppDispatch();

    const logOut = () => {
        dispatch({type:'LOG_OUT'})
    };

    return(
        <View style={styles.container}>
            <Button title='ВЫЙТИ' onPress = {logOut}/>
        </View>
    )
}