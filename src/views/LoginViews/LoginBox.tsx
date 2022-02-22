import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, TextInput, TouchableOpacity, Button} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const itemHeight = (Dimensions.get('window').height)

export function LoginBox()
{
    const dispatch = useAppDispatch();
    //const isLogIn = useAppSelector(state => state.isLogIn)

    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('');

    const check = () => {
        dispatch({type:'LOG_IN', payload:{Username:Username, Password: Password}});
        setUsername('');
        setPassword('');
    };
    
    return(

        <View style= {styles.container}>
            
            <TextInput value = {Username} onChangeText={setUsername}  autoFocus={true} textContentType='username' autoComplete='username' textAlign= 'center' placeholder='Username' maxLength={16} style={styles.input}/>
            <TextInput value = {Password} onChangeText={setPassword} autoFocus={false} secureTextEntry={true} textContentType='password' autoComplete='password' placeholder='Password' textAlign= 'center' maxLength={32} style={styles.input}/>
            <TouchableOpacity onPress={check}>
            <Text style = {styles.text}>Войти</Text>
            </TouchableOpacity>

        </View>
            )
}

const styles = StyleSheet.create({
    container: {
      width:'100%',
      height: itemHeight*0.2,
      backgroundColor: '#98FB98',
      marginVertical: 50,
      alignItems: 'center',
      elevation: 10,
      paddingVertical: 20,
      justifyContent: 'space-between'
    },

    input:
    {
        elevation: 5,
        borderRadius: 5,

        width:'70%',
        backgroundColor: 'white',
        fontSize:20,
        fontFamily: "OpenSans",
    },
    text:
    {
        opacity: 0.6,
        fontWeight: 'bold',
        fontSize:20,
        fontFamily: "OpenSans",
        //autoComplete: 'password'
    }
  });