import { toast } from "react-toastify";
import request from "../../utils/request";
import { profileActions } from "../slices/profileSlice";
import { authActions } from "../slices/authSlice";


//get user profile
export function getUserProfile (id) {
  return async (dispatch , getState) => {
    try {
      const {data} = await request.get(`/api/v1/users/profile/${id}` , {
        headers : {
          Authorization : `Bearer ${getState().auth.user.token}`
        }
      })
      dispatch(profileActions.setProfile(data))
    
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
}


//update user profile photo
export function uploadProfilePhoto (photo) {
  return async (dispatch , getState) => {
    try {
      const {data} = await request.post(`/api/v1/users/profile/profile-photo-upload` , photo , {
        headers : {
          Authorization : `Bearer ${getState().auth.user.token}`,
          "Content-Type" : "multipart/form-data"
        }
      })
      dispatch(profileActions.setProfilePhoto(data?.profilePhoto));
      dispatch(authActions.updateUserPhoto(data?.profilePhoto));
    

      const user = JSON.parse(localStorage.getItem("UserInfo"));
      user.profilePhoto = data?.profilePhoto;
      localStorage.setItem("UserInfo" , JSON.stringify(user));

      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
}


//update user profile data
export function updateProfileData (id , userData) {
  return async (dispatch , getState) => {
    try {
      const {data} = await request.put(`/api/v1/users/profile/${id}` , userData , {
        headers : {
          Authorization : `Bearer ${getState().auth.user.token}`,
          // "Content-Type" : "multipart/form-data"
        }
      })
      dispatch(profileActions.setProfileData(data));
      dispatch(authActions.updateUserName(data?.userName));
      toast.success(data.message)

      const user = JSON.parse(localStorage.getItem("UserInfo"));
      user.userName = data?.userName;
      user.bio = data?.bio;
      localStorage.setItem("UserInfo" , JSON.stringify(user));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
}
