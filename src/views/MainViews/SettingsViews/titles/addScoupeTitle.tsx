import React from "react";
import { Text, View } from "react-native";

const style=
{
    container:
    {
        //flex:1,
        height: '4%',
        width: '100%',
        backgroundColor: '#BFE4A9',
        elevation: 10
    }
}

export function AddScoupeTitle()
{
    return(
    <View style={style.container}>
        <Text style={{letterSpacing: 1, opacity: 0.65, textAlign:'center', fontSize:17, fontWeight: 'bold'}}>Изменить структуры</Text>
    </View>
    )
}