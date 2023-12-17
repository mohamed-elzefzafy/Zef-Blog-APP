import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlice";
import { postReducer } from "./slices/postSlice";
import { categorytReducer } from "./slices/categorySlice";
import { commentReducer } from "./slices/commentSlice";



const store = configureStore({
  reducer : {
  auth : authReducer,
  profile : profileReducer,
  post : postReducer,
  category : categorytReducer,
  comment : commentReducer,
  }
})


export default store;