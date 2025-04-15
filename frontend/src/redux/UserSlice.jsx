import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import sessionStorage from "redux-persist/es/storage/session";



export const UserAuth = createSlice({
    name:"user",
    initialState:{
        user:null,
        admin:null,
    },

    reducers:{
        SetAuthUser:(state,action)=>{
            state.user = action.payload;
        },
        SetAuthAdmin:(state,action)=>{
            state.admin = action.payload;
        }
    }
})

export const {SetAuthUser,SetAuthAdmin} = UserAuth.actions;
export const persistConfig = {
    key:'user',
    storage:sessionStorage
}
export const persistedReducer = persistReducer(persistConfig,UserAuth.reducer)
export default persistedReducer;
