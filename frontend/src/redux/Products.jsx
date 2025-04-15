import { createSlice } from "@reduxjs/toolkit";


export const ProductSlice = createSlice({
    name:'product',
    initialState:{
        products:[],
    },

    reducers:{
        setProducts:(state,action)=>{
            state.products = action.payload
        }
    }

})

export const {setProducts} = ProductSlice.actions
export default ProductSlice.reducer