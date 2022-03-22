
import React, { useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View } from 'react-native';
import { EmployeeTitle } from './EmployeeTitle';
import { RootState} from '../../../../redux/store';
import { useSelector } from 'react-redux';
import { StatisticsScreen } from '../StatisticsViews/StatisticsView';
import { getEmployeers } from '../../../requests/MainTabRequests/EmployeersRequests/EmployeersRequests';
import { EmployeeItem, EmployeeItemFull } from './Items/EmployeeItem';
import { getUser } from '../../../store/authToken';
import { isAnyOf } from '@reduxjs/toolkit';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F7FFF2',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export function EmployeesScreen()
{
    const [data, setData] = useState(new Array);

    const i = 0;

    useMemo(async () => {
        try{setData(await getEmployeers());}
        catch{console.log("Cant get employeers")}
    }, [i]);

    const renderItem = (emp:any) => {
        
        if(emp.index === selectedId)
        return (<TouchableOpacity onPress={()=>setSelectedId(null)}><EmployeeItemFull Employeer={emp.item} /></TouchableOpacity>)
    
        return (<TouchableOpacity onPress={()=>setSelectedId(emp.index)}><EmployeeItem Employeer={emp.item} /></TouchableOpacity>)
    };

    const [selectedId, setSelectedId] = useState(null);

    return(
        <View style={styles.container}>
            <EmployeeTitle/>

            <SafeAreaView style={styles.container}>
                <FlatList data={data} renderItem={renderItem} extraData={selectedId} keyExtractor={item => item.ID} />
            </SafeAreaView>
        </View>
    )
}