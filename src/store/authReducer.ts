import React, { useReducer } from "react";

const defaultState = 
{
    isLogIn: false,
}

export const authReducer = (state = defaultState, action: { type: string, payload:{Username:string, Password:string}}) =>{
    switch(action.type){
        case 'LOG_IN':
            return {...state, isLogIn: (action.payload.Username==='Tesold'&&action.payload.Password==='nikor1204')}

        case 'LOG_OUT':
            return {...state, isLogIn: false}

        default:
            return state
    }
}

