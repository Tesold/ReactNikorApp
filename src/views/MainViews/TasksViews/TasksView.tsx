import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#228B22',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export function TasksScreen()
    {
      return(
        <View style={styles.container}>

            <Text>Задачи</Text>

        </View>
            )
    }