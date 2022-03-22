import React, { useEffect, useMemo, useState } from "react";
import { Alert, FlatList, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getScoupes } from "../../../requests/MainTabRequests/SettingsRequests/Scoupe";
import {Picker} from '@react-native-picker/picker';
import {getDepartmentPositionNames} from "../../../requests/MainTabRequests/SettingsRequests/Department";
import { PositionNameItem, PositionNameItemFull } from "./items/PositionNameItem";
import { AddPositionNameTitle } from "./titles/addPositionNameTitle";
import { addPositionName } from "../../../requests/MainTabRequests/SettingsRequests/PositionName";

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
        fontSize:16,
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

export function AddPositionNameScreen()
{
    const createOneButtonAlert = () =>
            Alert.alert(
                "Наименование должности",
                "Успешно!",
                [
                { text: "OK", onPress: () => console.log("Успешно создано!") }
                ]
            );

    const mount = 1;

    const [PositionName, setPositionName] = useState(''); 

    const [ScoupeArray, setScoupeArray] = useState(new Array);

    const [selectedScoupe, setSelectetedScoupe] = useState('');

    const [selectedDepartment, setSelectedDepartment] = useState('');  

    const [selectedPositionName, setSelectedPositionName] = useState(null);

    const [positionNameArray, setPositionNameArray] = useState(new Array);

    const addPositionNameReq=async ()=>{

        try{
        console.log(currentDepartment());
        const status = await addPositionName(currentDepartment().ID, PositionName);

        if(status===201)
        createOneButtonAlert();
        }
        catch{
            Alert.alert(
                "Наименование должности",
                "Ошибка!",
                [
                { text: "OK", onPress: () => console.log("Ошибка!") }
                ]
            );
        }
    }

    const callback = async () =>{
        try{
            const response = await getDepartmentPositionNames(currentDepartment().ID);
            setPositionNameArray(response.map((_value: any)=>_value));
        }
        catch{console.log("Cant get posnames"); setPositionNameArray([])}
    }

    const renderItem = (emp:any) => {
        if(emp.index === selectedPositionName)
        return (<TouchableOpacity onPress={()=>setSelectedPositionName(null)}><PositionNameItemFull PositionName={emp.item} callback = {callback}/></TouchableOpacity>)
        
        return (<TouchableOpacity onPress={()=>setSelectedPositionName(emp.index)}><PositionNameItem PositionName={emp.item}  /></TouchableOpacity>)
    };

    useMemo(async () => {

        try{
            const response = await getScoupes();
            setScoupeArray(response.map((_value: any)=>_value));
            callback();
        }
        catch{console.log("Cant get scoupes")}
    }, [mount]);


    const currentScoupe = () => {
        const arr = ScoupeArray.find((item)=>item.ScoupeName === selectedScoupe);

        if(arr)
        return arr;

        return {DepartmentID: []}
    };

    const currentDepartment = () => {
       const arr = currentScoupe().DepartmentID.find((item:any)=>item.DepartmentName === selectedDepartment);

       if(arr)
       return arr;

       return {}
    }


    const mountDepartment = selectedDepartment+selectedScoupe;

    useEffect(()=>{callback()}, [selectedScoupe, selectedDepartment]);

    return(

        <View>
            <AddPositionNameTitle />
        <View style= {styles.container}>

        <View style ={{opacity: 1 ,flex: Platform.OS==='ios'?2:5, marginBottom: Platform.OS==='ios'?20:10, height: Platform.OS==='android'?10:10, width: "100%", justifyContent: 'center', alignItems:'center' ,alignContent: 'center', alignSelf: 'center', backgroundColor:Platform.OS==='android'?"#e5f2dc":''}}>
            <Picker
            
            style={{ height: Platform.OS==='ios'?"250%":50, width: "90%", opacity: 0.65, alignSelf: 'center'}}
            selectedValue={selectedScoupe}
            onValueChange={(itemValue, itemIndex) =>{
                setSelectetedScoupe(itemValue);
            }
            }>

            {ScoupeArray.map((item, index) => {
                return (<Picker.Item label={item.ScoupeName} value={item.ScoupeName} key={index}/>) })}

            </Picker>
            </View>


            <View style ={{alignItems:'center', flex: Platform.OS==='ios'?2:5, marginBottom: Platform.OS==='ios'?20:10, height: Platform.OS==='android'?10:10, width: "100%", justifyContent: 'center', alignContent: 'center', alignSelf: 'center', backgroundColor:Platform.OS==='android'?"#e5f2dc":''}}>
            <Picker
            
            style={{ height: Platform.OS==='ios'?"250%":50, width: "90%", opacity: 0.65, alignSelf: 'center'}}
            selectedValue={selectedDepartment}
            onValueChange={(itemValue, itemIndex) =>{
                setSelectedDepartment(itemValue);
            }
            }>

            {currentScoupe().DepartmentID.map((item:any, index:any) => {
                return (<Picker.Item label={item.DepartmentName} value={item.DepartmentName} key={index}/>) })}

            </Picker>

            
            </View>
            
                <View style={{flex:10}}>
            <TextInput value = {PositionName} onChangeText={setPositionName} textAlign= 'center' placeholder='Наименование должности' maxLength={32} style={styles.input}/>

            <TouchableOpacity style = {{marginBottom: 20}} onPress={async ()=>{
                addPositionNameReq()
                callback();
                setPositionName('');
            }}>
                <Text style = {styles.text}>Добавить</Text>
            </TouchableOpacity>

            <FlatList data={positionNameArray} renderItem = {renderItem} extraData={selectedPositionName} keyExtractor={item => item.ID}/>
            </View>

        </View>
        </View>

    )
}