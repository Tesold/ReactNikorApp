import React, { useMemo, useState } from "react";
import { Alert, Dimensions, FlatList, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getScoupes } from "../../../requests/MainTabRequests/SettingsRequests/Scoupe";
import { AddScoupeTitle } from "./titles/addScoupeTitle";
import {Picker} from '@react-native-picker/picker';
import { addDepartment } from "../../../requests/MainTabRequests/SettingsRequests/Department";
import { DepartmentItem, DepartmentItemFull } from "./items/DepartmentItem";
import { AddDepartmentTitle } from "./titles/addDepartmentTitle";

const itemHeight = (Dimensions.get('window').height);
const itemWidth = (Dimensions.get('window').width);

const styles = StyleSheet.create({
    container: {
      width:'100%',
      height: '100%',//itemHeight*0.75,
      backgroundColor: '#F7FFF2',
      marginVertical: 0,
      alignItems: 'center',
      elevation: 10,
      paddingBottom: 50,
      justifyContent: 'center',
      alignContent: 'center'
      
    },

    input:
    {
        elevation: 5,
        borderRadius: 10,
        marginVertical:10,
        marginTop: 10,
        width:'70%',
        backgroundColor: 'white',
        fontSize:20,
        fontFamily: "OpenSans",
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#BFE4A9'
    },
    text:
    {
        opacity: 0.6,
        fontWeight: 'bold',
        fontSize:20,
        fontFamily: "OpenSans",
        alignSelf: 'center'
        //autoComplete: 'password'
    },
    datePickerStyle: {
        width: '60%',
      },
  });

export function AddDepartmentScreen()
{
    const createOneButtonAlert = () =>
            Alert.alert(
                "Структура",
                "Успешно!",
                [
                { text: "OK", onPress: () => console.log("Успешно создано!") }
                ]
            );

    const mount = 1;

    const [DepartmentName, setDepartmentName] = useState(''); 

    const [ScoupeArray, setScoupeArray] = useState(new Array);

    const addDepartmentReq=async ()=>{
        const status = await addDepartment(ScoupeArray.find((element=>element.ScoupeName===selectedScoupe)).ID, DepartmentName);

        if(status===201)
        createOneButtonAlert();
    }

    const [selectedDepartment, setSelectedDepartment] = useState(null);

        const renderItem = (emp:any) => {
        
            console.log('ItemEMP: '+emp)
            if(emp.index === selectedDepartment)
            return (<TouchableOpacity onPress={()=>setSelectedDepartment(null)}><DepartmentItemFull Department={emp.item} /></TouchableOpacity>)
        
            return (<TouchableOpacity onPress={()=>setSelectedDepartment(emp.index)}><DepartmentItem Department={emp.item} /></TouchableOpacity>)
        };

    const [selectedScoupe, setScoupe] = useState('');    

    console.log(ScoupeArray);

    const data = () =>{

        try{
        const dt = ScoupeArray.find(element=>element.ScoupeName===selectedScoupe).DepartmentID;
        if(dt)
        return dt;}
        catch {
           return []; 
        }
    }

    useMemo(async () => {
        try{
            const response = await getScoupes();
            console.log(response);
            setScoupeArray(response.map((_value: any)=>_value));
        }
        catch{console.log("Cant get scoupes")}
    }, [mount]);

    return(

        <View>
            <AddDepartmentTitle />
        <View style= {styles.container}>

            <View style ={{flex: Platform.OS==='ios'?18:5, marginBottom: Platform.OS==='ios'?20:10, height: Platform.OS==='android'?10:10, width: "100%", justifyContent: 'center', alignContent: 'center', alignSelf: 'center', backgroundColor:Platform.OS==='android'?"#e5f2dc":''}}>
            <Picker
            
            style={{ height: Platform.OS==='ios'?"150%":50, width: "90%", opacity: 0.65, alignSelf: 'center'}}
            mode='dropdown'
            selectedValue={selectedScoupe}
            onValueChange={(itemValue, itemIndex) =>{
                setScoupe(itemValue);
            }
            }>

            {ScoupeArray.map((item, index) => {
                return (<Picker.Item label={item.ScoupeName} value={item.ScoupeName} key={index}/>) })}

            </Picker>
            </View>

            <View style ={{backgroundColor: '#BFE4A9' ,flex:10, width: itemWidth, alignContent: 'center', borderTopColor: '#BFE4A9', borderTopWidth: 2, borderBottomColor: '#BFE4A9', borderBottomWidth: 2}}>
            <TextInput value = {DepartmentName} onChangeText={setDepartmentName} textAlign= 'center' placeholder='Название отдела' maxLength={32} style={styles.input}/>

            <TouchableOpacity style = {{alignContent: 'center' ,alignSelf: 'center' ,marginBottom: 20, backgroundColor: '#F7FFF2', width: '35%', borderRadius: 5}} onPress={async ()=>{
                addDepartmentReq()
                setScoupeArray((await getScoupes()).map((_value: any)=>_value));
                setDepartmentName('');
            }}>
                <Text style = {styles.text}>Добавить</Text>
            </TouchableOpacity>
            </View >

            <View style={{flex:50}}>
            <FlatList data={data()} renderItem = {renderItem} extraData={selectedDepartment} keyExtractor={item => item.ID}/>
            </View>

        </View>
        </View>

    )
}