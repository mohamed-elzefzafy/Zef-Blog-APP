import { useSelector } from "react-redux";
import {Link} from "react-router-dom";

const HeaderRight = () => {
  const {user} = useSelector((state) => state.auth)
  return (
    <div className="header-right">
{ localStorage.getItem("UserInfo") ? (<>
<div className="header-right-info">
  <span className="header-right-username">
    {user.userName}
    </span>
  <img src={user.profilePhoto.url} alt="user" className="header-right-user-photo"/>
</div>
</>) : (<>
  <Link to="/login" className="header-right-link">
        <i className="bi bi-box-arrow-in-right"></i>
      <span>Login</span>
      </Link>

      <Link to="/register"  className="header-right-link">
        <i className="bi bi-person-plus"></i>
      <span>Register</span>
      </Link> 
</>)} 
    </div>
  )
}

export default HeaderRight