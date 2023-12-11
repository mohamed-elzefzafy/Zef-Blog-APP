import "./adminTable.css";
import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";


const UsersTablePage = () => {
  return (
    <section className="table-container">
  <AdminSidebar/>
      <div className="table-wrabber">
        <h1 className="table-title">Users</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[1 , 2 , 3 , 4 , 5].map((item) => 
            <tr key={item}>
            <td>{item}</td>
            <td>
              <div className="table-image">
              <img src="/images/user-avatar.png" alt="" className="user-image" />
              <span className="table-username">Mohamed Elzefzafy</span>
              </div>
            </td>
            <td>Elzefzafy@fdfdsfsd.dfss</td>
            <td>
              <div className="table-button-group">
                <button>
                  <Link to={`/profile/1`}>
                    View Profile
                  </Link>
                </button>
                <button>Delete User</button>
              </div>
            </td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default UsersTablePage;