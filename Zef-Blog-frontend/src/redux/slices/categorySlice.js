import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name : "category" , 
  initialState : {
    categories : [] ,
    category : null ,
    loadingCategory : false,
  }, 
  reducers : {
  setCategories (state , action) {
    state.categories = action.payload.data;
  },
  setCategory (state , action) {
    state.category = action.payload;
  },
  addCategory (state , action) {
    state.categories.push(action.payload);
  },
  deleteCategory (state , action) {
     state.categories  =  state.categories.filter((category) => category._id !== action.payload)
  },
  setLoading (state ) {
     state.loadingCategory = true
  },
  clearLoading (state ) {
     state.loadingCategory = false
  },
  }
})


const categoryAction = categorySlice.actions ;
const categorytReducer = categorySlice.reducer ;


export {categoryAction , categorytReducer};