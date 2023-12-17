import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../redux/apiCalls/authApiCall";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.warning("Email is required");
    if (password.trim() === "") return toast.warning("Password is required");

       dispatch(loginUser({email, password}));
      //  navigate("/");
  };


  // const loggedUser = useSelector((state) => state.auth.user);
  // if (loggedUser)
  // console.log(loggedUser);

  return (
    <section className="form-container">
    <h1 className="form-title">Login to your Account</h1>
    <form onSubmit={loginSubmitHandler} className="form">

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-input"
          id="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-input"
          id="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="form-btn">
        Login
      </button>
    </form>
    <div className="form-footer">
      Did you fotgot your Password <Link to="/forgot-password">Forgot Password</Link>
    </div>
  </section>
  )
}

export default LoginPage;