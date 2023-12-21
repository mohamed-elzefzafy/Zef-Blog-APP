import { createSlice } from "@reduxjs/toolkit";


const passwordSlice = createSlice({
  name : "password" , 
  initialState : {
  isError : false,
  }, 
  reducers : {
    setError (state ) {
       state.isError = true
    },
  }
})


const passwordAction = passwordSlice.actions ;
const passwordReducer = passwordSlice.reducer ;


export {passwordAction , passwordReducer};