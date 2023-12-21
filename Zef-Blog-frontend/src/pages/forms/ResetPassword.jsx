import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getResetPassword, resetPassword } from "../../redux/apiCalls/passwordApiCall";
import { useNavigate, useParams } from "react-router-dom";


const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {isError} = useSelector(state => state.password);
 const navigate = useNavigate();
const {userId , token} = useParams();

  useEffect(() => {
dispatch(getResetPassword(userId , token));
  },[userId, token]);




  const registerSubmitHandler = (e) => {
    e.preventDefault();
    if (password.trim() === "") return toast.warning("password is required");
    dispatch(resetPassword( {userId , token} , password));
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };



  const [showPassword, setshowPassword] = useState(false);

  const showPasswordHandler = () => {
    setshowPassword(prev => !prev)
  }
  

  return (
    <section className="form-container">
    {isError ? <h1>Not Found</h1> : 
    <>
    <h1 className="form-title">Reset Password</h1>
    <form onSubmit={registerSubmitHandler} className="form">

    <div className="form-group" style={{position : "relative"}}>
        <label htmlFor="password" className="form-label">
        New Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          className="form-input"
          id="password"
          placeholder="Enter Your New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {showPassword ?  <i onClick={showPasswordHandler} className="bi bi-eye-fill show-password-icon"></i>  :
            <i onClick={showPasswordHandler} className="bi bi-eye-slash-fill show-password-icon"></i> 
            }
        
      </div>

      <button type="submit" className="form-btn">
        Submit
      </button>
    </form>

    </>
    }
  

  </section>
  )
}

export default ResetPassword;









