import swal from "sweetalert";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";


const CommentsTablePage = () => {

  const deleteCommentHandler = () => {

    swal({
      title: "Are you sure?",
      text: "you will delete this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Comment has been deleted!", {
          icon: "success",
        });
      } else {
        // swal("something went wrong!");
      }
    });

  }

  return (
    <section className="table-container">
    <AdminSidebar/>
        <div className="table-wrabber">
          <h1 className="table-title">Comments</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Count</th>
                <th>User</th>
                <th>Comment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {[1 , 2 , 3 , 4 , 5].map((comment , index) => 
              <tr key={comment}>
              <td>{index + 1}</td>
              <td>
                <div className="table-image">
                <img src="/images/user-avatar.png" alt="" className="user-image" />
                <span className="table-username">Mohamed elzefzafy</span>
                </div>
              </td>
              <td>amazing post</td>
              <td>
                <div className="table-button-group">
            
                  <button onClick={deleteCommentHandler}>Delete Comment</button>
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

export default CommentsTablePage;