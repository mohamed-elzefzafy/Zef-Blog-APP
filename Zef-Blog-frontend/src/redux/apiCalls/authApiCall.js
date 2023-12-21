import { toast } from "react-toastify";
import request from "../../utils/request";
import { authActions } from "../slices/authSlice";



//login user
export function loginUser (user) {
  return async (dispatch) => {
    try {
      const {data} = await request.post("/api/v1/auth/login" , user)
      dispatch(authActions.login(data))
    await  localStorage.setItem("UserInfo" , JSON.stringify(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}

//logout user
export function logoutUser () {
  return  (dispatch) => {
    dispatch(authActions.logout())
    localStorage.removeItem("UserInfo");
  }
}

//register user
export function registerUser (user) {
  return async (dispatch) => {
    try {
      const {data} = await request.post("/api/v1/auth/register" , user)
      dispatch(authActions.register(data.message))
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}


export function verifyEmail (userId , token) {
  return async (dispatch) => {
    try {
   await request.get(`/api/v1/auth/${userId}/verify/${token}`);
      dispatch(authActions.setIsEmailVerified());
    } catch (error) {
      
    }
  }
}