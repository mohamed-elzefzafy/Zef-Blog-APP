import { useState } from "react";
import "./form.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import swal from "sweetalert";

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
const navigate = useNavigate();
const {registerMessage} = useSelector((stste) => stste.auth);

  const registerSubmitHandler = (e) => {
    e.preventDefault();
    if (userName.trim() === "") return toast.warning("Username is required");
    if (email.trim() === "") return toast.warning("Email is required");
    if (password.trim() === "") return toast.warning("Password is required");

    dispatch(registerUser({userName, email, password }))
    console.log({ userName, email, password });

  };

  if (registerMessage) {
    swal({
      title: registerMessage,
      icon: "success",
    })
    .then((isOk) => {
      if (isOk) {
        navigate("/login");
      } 
    });
  }



  
  return (
    <section className="form-container">
      <h1 className="form-title">Create New Account</h1>
      <form onSubmit={registerSubmitHandler} className="form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            UserName
          </label>
          <input
            type="text"
            className="form-input"
            id="username"
            placeholder="Enter Your Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

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
          Register
        </button>
      </form>
      <div className="form-footer">
        Already Have An Account <Link to="/login">Login</Link>
      </div>
    </section>
  );
};

export default RegisterPage;
