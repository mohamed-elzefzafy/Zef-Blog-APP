import { authActions } from "../slices/authSlice";


//login user
export function loginUser (user) {
  return async (dispatch) => {
    try {
      
      const response = await fetch("https://zef-blog.onrender.com/api/v1/auth/login" , {
      // const response = await fetch("http://localhost:8000/api/v1/auth/login" , {
        method : "POST" ,
        body  : JSON.stringify(user) ,
        headers : {
          "Content-Type" : "application/json",
        }
      })
      const data = await response.json();
      dispatch(authActions.login(data))
    await  localStorage.setItem("UserInfo" , JSON.stringify(data?.data));
    } catch (error) {
      console.log(error);
    }
  }
}