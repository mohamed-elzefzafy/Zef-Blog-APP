import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
  name : "auth",
  initialState : {
    user : localStorage.getItem("UserInfo") ? JSON.parse(localStorage.getItem("UserInfo")) : null,
    registerMessage : null,
    isEmailVerified : true,

  },
  reducers : {
    login (state , action) {
       state.user = action.payload;
       state.registerMessage = null;
    },
    logout (state) {
       state.user = null;
    },
    register (state , action) {
       state.registerMessage = action.payload ;
    },
    updateUserPhoto (state , action) {
       state.user.profilePhoto = action.payload ;
    },
    updateUserName (state , action) {
       state.user.userName = action.payload ;
    },
    setIsEmailVerified (state) {
      state.isEmailVerified = true ;
      state.registerMessage = null;
    },
  }
})


const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export {authReducer , authActions};