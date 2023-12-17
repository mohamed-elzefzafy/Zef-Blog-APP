import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const HeaderRight = () => {
  const [dropDown, setDropDown] = useState(false);
  const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
     navigate("/login");
     setDropDown(false);
  }
  return (
    <div className="header-right">
{ localStorage.getItem("UserInfo") ? (<>
<div className="header-right-info" onClick={() => setDropDown(prev => !prev)}>
  <span className="header-right-username">
    {user?.userName}
    </span>
  <img src={user?.profilePhoto?.url} alt="user" className="header-right-user-photo"/>
 {dropDown && 
  <div className="header-right-dropdown">
    <Link to={`/profile/${user?._id}`} className="header-dropdown-item"
    //  onClick={() => setDropDown(false)}
     >
       <i className="bi bi-file-person"></i>
       <span>profile</span>

    </Link>
    <div onClick={handleLogout} className="header-dropdown-item">
      <i className="bi bi-box-arrow-in-left"></i>
      <span >Logout</span>
    </div>
  </div>
 }
</div>
</>) : (<>
  <Link onClick={() => setDropDown(false)} to="/login" className="header-right-link">
        <i className="bi bi-box-arrow-in-right"></i>
      <span >Login</span>
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