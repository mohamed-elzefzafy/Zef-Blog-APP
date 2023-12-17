import {Link} from "react-router-dom";

const HeaderLeft = ({toggle , setToggle }) => {
  return (
    <div className="header-left">
    <Link to="/" className="header-logo">
      <img src="https://res.cloudinary.com/dw1bs1boz/image/upload/v1702487390/Zef-Blog/Default%20images/ZefBlogIcon_j2iy9h.png" 
      className="logo-img" alt="logo"/>
    </Link>
    <div className="header-menu" onClick={() => setToggle(toggle => !toggle)}>
    
    {toggle ? <i className="bi bi-x"></i>: <i className="bi bi-list"></i>}
    </div>
  </div>
  )
}

export default HeaderLeft