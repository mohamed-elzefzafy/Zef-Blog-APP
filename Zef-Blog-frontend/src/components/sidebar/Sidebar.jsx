import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = ({categories}) => {
  
  return (
  <div className="sidebar">
    <h5 className="sidebar-title">CATEGORIES</h5>
    <ul className="sidebar-links">
      {
        categories?.map((category) => 
        <Link to={`/posts/categories/${category?._id}`} key={category?._id} className="sidebar-link">{category?.title}</Link>
        )
      }
    </ul>
  </div>
  )
}

export default Sidebar;