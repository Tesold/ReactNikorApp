import { combineReducers, configureStore, createReducer, createStore } from "@reduxjs/toolkit";
import AuthReducer from './reducers'


const RootReducer = combineReducers({
  AuthReducer
})
export const store = createStore(RootReducer)

export type RootState = ReturnType<typeof RootReducer>
