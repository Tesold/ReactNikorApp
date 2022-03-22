import React, { useMemo, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { addScoupeName, getScoupes } from "../../../requests/MainTabRequests/SettingsRequests/Scoupe";
import { ScoupeItem, ScoupeItemFull } from "./items/ScoupeItem";
import { AddScoupeTitle } from "./titles/addScoupeTitle";

const styles = StyleSheet.create({
    container: {
      width:'100%',
      height:"100%",
      //',//itemHeight*0.75,
      backgroundColor: '#F7FFF2',
      marginVertical: 0,
      alignItems: 'center',
      elevation: 10,
      paddingBottom: 10,
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

export function AddScoupeScreen(props:any)
{
    const createOneButtonAlert = () =>
            Alert.alert(
                "Структура",
                "Успешно!",
                [
                { text: "OK", onPress: () => console.log("Успешно создано!") }
                ]
            );
    
    const [ScoupeName, setScoupeName] = useState(''); 
    const addScoupeNameReq=async ()=>{
        const status = await addScoupeName(ScoupeName);
        
        console.log(status)
        if(status===201){
        createOneButtonAlert();
        const response = await getScoupes();
        setScoupeArray(response.map((_value: any)=>_value));
        }

    }

    const callback = async () =>{
        const response = await getScoupes();
        setScoupeArray(response.map((_value: any)=>_value));
    }

    const [ScoupeArray, setScoupeArray] = useState(new Array);

    const [selectedScoupe, setSelectedScoupe] = useState(null);

    const  mount = 1;

    useMemo(async () => {
        try{
            const response = await getScoupes();
            setScoupeArray(response.map((_value: any)=>_value));
        }
        catch{console.log("Cant get scoupes")}
    }, [mount]);

    const renderItem = (emp:any) => {
        
        console.log('ItemEMP: '+emp)
        if(emp.index === selectedScoupe)
        return (<TouchableOpacity onPress={()=>setSelectedScoupe(null)}><ScoupeItemFull Scoupe={emp.item} callback={callback} /></TouchableOpacity>)
    
        return (<TouchableOpacity onPress={()=>setSelectedScoupe(emp.index)}><ScoupeItem Scoupe={emp.item} /></TouchableOpacity>)
    };



    
    return(
        
        <View  style= {styles.container}>
        <AddScoupeTitle />

            <View style={{width: '100%' , alignItems: 'center', marginVertical: 20}}>
            
            <TextInput value = {ScoupeName} onChangeText={setScoupeName} textAlign= 'center' placeholder='Название структуры' maxLength={32} style={styles.input}/>

            <TouchableOpacity onPress={()=>addScoupeNameReq()}>
                <Text style = {styles.text}>Добавить</Text>
            </TouchableOpacity>
            </View>

            <View style={{flex:1}}>
            <FlatList style={{flex:1}} data={ScoupeArray} renderItem = {renderItem} extraData={selectedScoupe} keyExtractor={item => item.ID}/>
            </View>
           
        </View>
        
    )
}