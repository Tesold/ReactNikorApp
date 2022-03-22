import React from "react";
import { Text, View } from "react-native";

const style=
{
    container:
    {
        height: '4%',
        width: '100%',
        backgroundColor: '#BFE4A9',
        elevation: 10,
        shadowColor: 'black',
        shadowRadius: 5,
        shadowOpacity: 1,
    },
}

export function AddPositionNameTitle()
{
    return(
    <View style={style.container}>
        <Text style={{  letterSpacing: 1, opacity: 0.65, textAlign:'center', fontSize:17, fontWeight: 'bold'}}>Изменить наименования должностей</Text>
    </View>
    )
}