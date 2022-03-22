import { createSlice, configureStore } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    ACCESS_TOKEN: 'none',
    LOG_IN: false
  },
  reducers: {
    LOG_IN:(state, action)=>{
      switch(action.type){
        case "LOG_IN": return {...state, LOG_IN: true}

        case "LOG_OUT": return {...state, LOG_IN: false}
      }
    },
  }
    /*SET_ACCESSTOKEN: (state, action) => 
      state.ACCESS_TOKEN = action.payload
    ,
    LOG_OUT: state => ({...state, LOG_IN: false}),*/
    
  
})

export const { LOG_IN } = counterSlice.actions;
export default counterSlice.reducer;

