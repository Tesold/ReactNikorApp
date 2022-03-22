
import React, { createRef, useEffect, useRef, useState, version } from 'react';
import { Alert, Button, Dimensions, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Registration } from '../../../requests/authRequests';
import { TextInputMask } from 'react-native-masked-text'
import { RootState, store } from '../../../../redux/store';
import { useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const itemHeight = (Dimensions.get('window').height);
const styles = StyleSheet.create({
    container: {
      width:'100%',
      height: '100%',//itemHeight*0.75,
      backgroundColor: '#F7FFF2',
      marginVertical: 0,
      alignItems: 'center',
      elevation: 10,
      paddingBottom: 50,
      justifyContent: 'center'
      
    },

    input:
    {
        elevation: 5,
        borderRadius: 5,
        marginVertical:10,
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
    },
    datePickerStyle: {
        width: '60%',
      },
  });

  const container = StyleSheet.create({
    container: {
        width:'100%',
        height: '290%',//itemHeight*0.75,
        backgroundColor: '#F7FFF2',
        marginVertical: 0,
        alignItems: 'center',
        elevation: 10,
        paddingBottom: 50,
        justifyContent: 'center'
      }
  });

 

export function RegistrtionScreen(props:any)
{


    console.log(props)
    const [Nickname, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [Firstname, setFirstname] = useState('');
    const [Middlename, setMiddlename] = useState('');
    const [Lastname, setLastname] = useState('');
    const [Email, setEmail] = useState('');
    const [Birthday, setBday] = useState('');
    const [Permission, setPermission] = useState('');
    const [date, setDate] = useState({text: ''});

    const userData = {
        Nickname: Nickname,
        Password: Password,
        FirstName: Firstname,
        LastName: Lastname,
        MiddleName: Middlename,
        Email: Email,
        Permission: Permission,
        Birthday: date.text,
        Timezone: 3
    }

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    
        // cleanup function
        return () => {
          Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
          Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
        };
      }, []);

    
      const [keyboardStyle, setKeyboardStyle] = useState(styles.container);
      const _keyboardDidShow = () => {setKeyboardStyle(container.container);};
      const _keyboardDidHide = () => {setKeyboardStyle(styles.container);};

      const createOneButtonAlert = () =>
            Alert.alert(
                "Alert Title",
                "My Alert Msg",
                [
                { text: "OK", onPress: () => console.log("Успешно создано!") }
                ]
            );

      const Registrate = (userData:any) =>{
        Registration(userData);
        createOneButtonAlert();
      }

      

    return(
        
        <KeyboardAwareScrollView 
         scrollEnabled={true} contentContainerStyle={keyboardStyle} style={{flex:1 }} enableAutomaticScroll={true} enableOnAndroid = {true}>
        <TextInput value = {Nickname} onChangeText={setUsername} textAlign= 'center' placeholder='Username' maxLength={16} style={styles.input}/>
        <TextInput value = {Password} onChangeText={setPassword} autoFocus={false} secureTextEntry={true} placeholder='Password' textAlign= 'center' maxLength={32} style={styles.input}/>
        <TextInput value = {Firstname} onChangeText={setFirstname}  autoFocus={false} textAlign= 'center' placeholder='Firstname' maxLength={16} style={styles.input}/>
        <TextInput value = {Lastname} onChangeText={setLastname} autoFocus={false} placeholder='Lastname' textAlign= 'center' maxLength={32} style={styles.input}/>
        <TextInput value = {Middlename} onChangeText={setMiddlename} autoFocus={false} placeholder='Middlename' textAlign= 'center' maxLength={32} style={styles.input}/>
        <TextInput value = {Email} onChangeText={setEmail} autoFocus={false} placeholder='Email' textAlign= 'center' maxLength={32} style={styles.input}/>
        <TextInput value = {Permission} onChangeText={setPermission} autoFocus={false} placeholder='Permission' textAlign= 'center' maxLength={32} style={styles.input}/>
        <TextInputMask
            type={'datetime'}
            options={{
                format: 'DD/MM/YYYY'
            }}
            style={styles.input}
            value={date.text}
            onChangeText={text => setDate({text: text})}/>
        

        <TouchableOpacity onPress={()=>Registrate(userData)}>
        <Text style = {styles.text}>Зарегистрировать</Text>
        </TouchableOpacity>
        </KeyboardAwareScrollView>
       
            
        
    )
}