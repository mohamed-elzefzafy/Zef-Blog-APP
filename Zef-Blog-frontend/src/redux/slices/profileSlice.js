import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name : "profile",
  initialState : {
   profile : null,
   loading : false ,
   isProfileDeleted : false ,
   userCount : null ,
   profiles : [],
  },
  reducers : {
    setProfile (state , action) {
        state.profile = action.payload;
    },
    setProfilePhoto (state , action) {
        state.profile.profilePhoto = action.payload;
    },
    setProfileData (state , action) {
        state.profile = action.payload;
    },
    setLoading (state ) {
        state.loading = true;
    },
    clearLoading (state ) {
        state.loading = false;
    },
    setIsProfileDeleted (state ) {
      state.isProfileDeleted = true
        state.loading = false;
    },
    clearIsProfileDeleted (state ) {
      state.isProfileDeleted = false
    },
    setUsersCount (state , action) {
    state.userCount = action.payload;
    },
    getAllUsers (state , action) {
    state.profiles = action.payload;
    },
   deleteUser (state , action) {
   state.profiles = state.profiles.filter((profile) => profile._id !== action.payload);
   },
  }
})


const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export {profileReducer , profileActions};