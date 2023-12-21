import "./adminTable.css";
import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteProfile, getAllUsers } from "../../redux/apiCalls/profileApiCall";


const UsersTablePage = () => {

  const dispatch = useDispatch();


  const {profiles , isProfileDeleted , loading} = useSelector(state => state.profile);

useEffect(() => {
  dispatch(getAllUsers());
  },[isProfileDeleted , dispatch , loading])
  



  const deleteUserHandler = (id) => {

    swal({
      title: "Are you sure?",
      text: "you will delete this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
  dispatch(deleteProfile(id))
      } 
    });

  }

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
            {profiles?.data?.map((user , index) => 
            <tr key={user._id}>
            <td>{index + 1}</td>
            <td>
              <div className="table-image">
              <img src={user?.profilePhoto?.url} alt="" className="user-image" />
              <span className="table-username">{user?.userName}</span>
              </div>
            </td>
            <td>{user?.email}</td>
            <td>
              <div className="table-button-group">
                <button>
                  <Link to={`/profile/${user?._id}`}>
                    View Profile
                  </Link>
                </button>
                <button onClick={() => deleteUserHandler(user?._id)}>Delete User</button>
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