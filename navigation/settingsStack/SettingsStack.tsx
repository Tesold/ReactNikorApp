import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RegistrtionScreen } from "../../src/views/MainViews/SettingsViews/RegistrationView";
import { SettingsTitle } from "../../src/views/MainViews/SettingsViews/titles/SettingsTitle";
import { SettingsScreen } from "../../src/views/MainViews/SettingsViews/SettingsView";
import { AddScoupeScreen } from "../../src/views/MainViews/SettingsViews/ScoupeView";
import { AddDepartmentScreen } from "../../src/views/MainViews/SettingsViews/DepartmentView";
import { AddPositionNameScreen } from "../../src/views/MainViews/SettingsViews/PositionNameView";
import { AddPositionScreen } from "../../src/views/MainViews/SettingsViews/PositionView";
import { View } from "react-native";

const Stack = createNativeStackNavigator();

export function SettingsStackNavigator()
{
    
    const settingsStack = createNativeStackNavigator();

    return(
        <View style = {{flex:1}}>
        <SettingsTitle/>
        <settingsStack.Navigator>
                
            <Stack.Screen options = {{headerShown: false}} name=" " component={SettingsScreen} />
            <Stack.Screen options = {{headerShown: false, headerStyle:{backgroundColor: '#F7FFF2'}}} name="Registration" component={RegistrtionScreen} />
            <Stack.Screen options = {{headerShown: false}} name="AddScoupe" component={AddScoupeScreen} />
            <Stack.Screen options = {{headerShown: false}} name="AddDepartment" component={AddDepartmentScreen} />
            <Stack.Screen options = {{headerShown: false}} name="AddPositionName" component={AddPositionNameScreen} />
            <Stack.Screen options = {{headerShown: false}} name="AddPosition" component={AddPositionScreen} />

        </settingsStack.Navigator>
        </View>
    )
  }