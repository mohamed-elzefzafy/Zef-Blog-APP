import { useState } from "react";
import { toast } from "react-toastify";


const ResetPassword = () => {
  const [password, setPassword] = useState("");


  const registerSubmitHandler = (e) => {
    e.preventDefault();
    if (password.trim() === "") return toast.warning("password is required");
    console.log({ password });
  };

  return (
    <section className="form-container">
    <h1 className="form-title">Reset Password</h1>
    <form onSubmit={registerSubmitHandler} className="form">

    <div className="form-group">
        <label htmlFor="password" className="form-label">
        New Password
        </label>
        <input
          type="password"
          className="form-input"
          id="password"
          placeholder="Enter Your New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="form-btn">
        Submit
      </button>
    </form>

  </section>
  )
}

export default ResetPassword;