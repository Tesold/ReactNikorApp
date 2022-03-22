import { InitialState } from "@react-navigation/native";

const initialState = 
{
    LOG_IN: false,
    ACCESS_TOKEN: 'none',
    payload: {}
}

export default (state=initialState, action:any)=>{

    switch(action.type)
    {
        case 'LOG_IN': return {...state, LOG_IN:true};
        case 'LOG_OUT': return {...state, LOG_IN: false};
        case 'SET_ACCESSTOKEN': return {...state, ACCESS_TOKEN: action.payload};
        default: return state;
    }
}