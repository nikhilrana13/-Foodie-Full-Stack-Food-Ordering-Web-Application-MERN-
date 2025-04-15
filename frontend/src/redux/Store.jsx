import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice";
import sessionStorage from "redux-persist/es/storage/session";
import { persistReducer, persistStore } from "redux-persist";
import { ProductSlice } from "./Products";



const userperisistConfig={
    key:'user',
    storage:sessionStorage
}

const persistConfigUser = persistReducer(userperisistConfig,UserReducer)


const rootReducer = combineReducers({user:persistConfigUser,product:ProductSlice.reducer})
export const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware
    ({serializableCheck:false})
})

export const persistor = persistStore(store)

