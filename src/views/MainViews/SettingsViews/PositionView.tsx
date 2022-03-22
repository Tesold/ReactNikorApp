import React, { useEffect, useMemo, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {Picker} from '@react-native-picker/picker';
import { AddPositionNameTitle } from "./titles/addPositionNameTitle";
import { addPosition, getAllPositions, getPositionNamePosition } from "../../../requests/MainTabRequests/SettingsRequests/Position";
import { PositionItem, PositionItemFull } from "./items/PositionItem";
import { getScoupesWithAllData } from "../../../requests/MainTabRequests/SettingsRequests/Scoupe";

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

export function AddPositionScreen()
{
    const createOneButtonAlert = () =>
            Alert.alert(
                "Должность",
                "Успешно!",
                [
                { text: "OK", onPress: () => console.log("Успешно создано!") }
                ]
            );

    const mount = 1;

    const [PositionCode, setPositionCode] = useState(''); 

    const [ScoupeArray, setScoupeArray] = useState(new Array);
    const [DepartmentArray, setDepartmentArray] = useState(new Array);
    const [PositionNameArray, setPositionNameArray] = useState(new Array);
    const [AllPositionsArray, setAllPositionsArray] = useState(new Array);
    const [PositionArray, setPositionArray] = useState(new Array);

    const [selectedScoupe, setSelectetedScoupe] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');  
    const [selectedPositionName, setSelectedPositionName] = useState('');
    const [selectedPosition, setSelectedPosition] = useState(null);

    async function addPositionReq(){
        try{
        console.log(currentPositionName());
        const status = await addPosition(currentPositionName().ID, PositionCode);

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

    async function callbackPosition(){
        try{
        const response = await getAllPositions();
        setAllPositionsArray(response)
        //setPositionArray(getCurrentPositionArray());
        }
        catch{}
    }

    function renderItem(emp:any){
        if(emp.index === selectedPosition)
        return (<TouchableOpacity onPress={()=>setSelectedPosition(null)}><PositionItemFull Position={emp.item} callback = {callbackPosition}/></TouchableOpacity>)
        
        return (<TouchableOpacity onPress={()=>setSelectedPosition(emp.index)}><PositionItem Position={emp.item}  /></TouchableOpacity>)
    };

    useMemo(async () => {

        try{
            const response = await getScoupesWithAllData();
            setScoupeArray(response.map((_value: any)=>_value));
            callbackPosition();
        }
        catch{console.log("Cant get scoupes")}
    }, [mount]);

    useEffect(()=>{
        try{
            if(currentScoupe().DepartmentID)
            {
                setDepartmentArray(currentScoupe().DepartmentID);
                setSelectedDepartment(DepartmentArray[0].DepartmentName)

                if(currentDepartment().PositionName)
                {
                    setPositionNameArray(currentDepartment().PositionName);
                    setSelectedPositionName(PositionNameArray[0].PositionName)
                }
                else{
                    setPositionNameArray([]);
                    setSelectedPositionName('')
                }
            }
            else{
                setDepartmentArray([]);
                setSelectedDepartment('');
            }
        }
        catch{

        }
    },[selectedScoupe])

    useEffect(()=>{
        try{
            if(currentDepartment().PositionName)
            {
                setPositionNameArray(currentDepartment().PositionName);
               // setSelectedPositionName(PositionNameArray[0].PositionName)
            }
            else{
                setPositionNameArray([]);
                setSelectedPositionName('')
            }
        }
        catch{

        }
    },[selectedDepartment, DepartmentArray])

    useEffect(()=>{
        try{
                setPositionArray(getCurrentPositionArray());
        }
        catch{

        }
    },[selectedPositionName, AllPositionsArray, selectedScoupe])

    function currentScoupe(){
        const arr = ScoupeArray.find((item)=>item.ScoupeName === selectedScoupe);

        if(arr)
        return arr;

        return {}
    };

    function currentDepartment(){

        try{
            const arr = currentScoupe().DepartmentID.find((item:any)=>item.DepartmentName === selectedDepartment);

            if(arr)
            return arr;

            return {}
        }
        catch{return {}}
    }

    function currentPositionName(){

        try{
        const arr = PositionNameArray.find((item:any)=>item.PositionName === selectedPositionName);

        if(arr)
        return arr;
        }
        catch{
        return {}
        }
    }

    function getCurrentPositionArray(){
        try{
        return AllPositionsArray.map(position=>{if(position.PositionNameID===currentPositionName().ID) return position})
        }
        catch { return []}
    }

    console.log(AllPositionsArray)

    return(

        <View>
            <AddPositionNameTitle />
        <View style= {styles.container}>

            <View style ={{marginBottom: 20,height: 50, width: "100%", justifyContent: 'center', alignContent: 'center', alignSelf: 'center', backgroundColor:"#e5f2dc"}}>
            <Picker
            style={{ height: 50, width: "90%", opacity: 0.65, alignSelf: 'center'}}
            selectedValue={selectedScoupe}
            onValueChange={(itemValue, itemIndex) =>{
                setSelectetedScoupe(itemValue);
            }
            }>

            {
                ScoupeArray.map((item, index) => {return (<Picker.Item label={item.ScoupeName} value={item.ScoupeName} key={index}/>)})
            }

            </Picker>
            </View>

            <View style ={{marginBottom: 20,height: 50, width: "100%", justifyContent: 'center', alignContent: 'center', alignSelf: 'center', backgroundColor:"#e5f2dc"}}>
            <Picker
            
            style={{ height: 50, width: "90%", opacity: 0.65, alignSelf: 'center'}}
            selectedValue={selectedDepartment}
            onValueChange={(itemValue, itemIndex) =>{
                setSelectedDepartment(itemValue);
            }
            }>

            { 
                DepartmentArray.map((item:any, index:any) => {return (<Picker.Item label={item.DepartmentName} value={item.DepartmentName} key={index}/>) })
            }

            </Picker>
            </View>

            <View style ={{marginBottom: 20,height: 50, width: "100%", justifyContent: 'center', alignContent: 'center', alignSelf: 'center', backgroundColor:"#e5f2dc"}}>
            <Picker
            
            style={{ height: 50, width: "90%", opacity: 0.65, alignSelf: 'center'}}
            selectedValue={selectedPositionName}
            onValueChange={(itemValue, itemIndex) =>{
                setSelectedPositionName(itemValue);
                callbackPosition();
            }
            }>
            
            {   
                PositionNameArray.map((item:any, index:any) =>{return <Picker.Item label={item.PositionName} value={item.PositionName} key={index}/>})
            }

            </Picker>
            </View>
            

            <TextInput value = {PositionCode} onChangeText={setPositionCode} textAlign= 'center' placeholder='Код должности' maxLength={32} style={styles.input}/>

            <TouchableOpacity style = {{marginBottom: 20}} onPress={async ()=>{
                addPositionReq()
                callbackPosition();
                setPositionCode('');
            }}>
                <Text style = {styles.text}>Добавить</Text>
            </TouchableOpacity>

            <FlatList data={PositionArray} renderItem = {renderItem} extraData={selectedPositionName} keyExtractor={item => item.ID}/>

        </View>
        </View>

    )
}