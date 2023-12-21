import { Link, useParams } from "react-router-dom";
import "./verifyEmail.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyEmail } from "../../redux/apiCalls/authApiCall";

const VerifyEmailPage = () => {
  const dispatch = useDispatch();
  const {isEmailVerified} = useSelector(state => state.auth)
  const {userId , token} = useParams();

  
  useEffect(() => {
    dispatch(verifyEmail(userId , token));
  },[userId , token]);

  return (
  <section className="verify-email">
{isEmailVerified ? (<>
<i className="bi bi-patch-check verify-email-icon"></i>
<h1 className="verify-email-title">your Email has been verified successfully</h1>
<Link to="/login" className="verify-email-link">
  Go To Login Page
</Link>
</>) : 
(<>
<h1 className="verify-email-not-found">Not Found</h1>
</>)}
  </section>
  )
}

export default VerifyEmailPage;