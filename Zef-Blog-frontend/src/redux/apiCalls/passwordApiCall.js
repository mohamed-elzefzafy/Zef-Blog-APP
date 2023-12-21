import { toast } from "react-toastify";
import request from "../../utils/request";
import { passwordAction } from "../slices/passwordSlice";

// forgot password
export function forgotPassword (email) {
  return async () => {
    try {
      const {data} = await request.post("/api/v1/password/reset-password-link" , {email} )
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}

// get reset password
export function getResetPassword (userId , token) {
  return async (dispatch) => {
    try {
     await request.get(`/api/v1/password/reset-password/${userId}/${token}`)
    
    } catch (error) {
    dispatch(passwordAction.setError());
    }
  }
}
// reset password
export function resetPassword (user , password ) {
  return async () => {
    try {
      const {data} = await request.post(`/api/v1/password/reset-password/${user.userId}/${user.token}` , {password})
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}