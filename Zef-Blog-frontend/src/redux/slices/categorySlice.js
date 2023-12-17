import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name : "category" , 
  initialState : {
    categories : [] ,
    category : null ,
  } , 
  reducers : {
  setCategories (state , action) {
    state.categories = action.payload;
  },
  setCategory (state , action) {
    state.category = action.payload;
  },
  }
})


const categoryAction = categorySlice.actions ;
const categorytReducer = categorySlice.reducer ;


export {categoryAction , categorytReducer};