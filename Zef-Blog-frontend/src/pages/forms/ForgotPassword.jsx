import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");


  const registerSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.warning("Email is required");
    console.log({ email });
  };

  return (
    <section className="form-container">
    <h1 className="form-title">Forgot Password</h1>
    <form onSubmit={registerSubmitHandler} className="form">

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


      <button type="submit" className="form-btn">
        Submit
      </button>
    </form>

  </section>
  )
}

export default ForgotPassword;