import swal from "sweetalert";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteComment, getAllComments } from "../../redux/apiCalls/commentApiCall";


const CommentsTablePage = () => {

  const dispatch = useDispatch();

  const { comments } = useSelector(state => state.comment);

useEffect(() => {
  dispatch(getAllComments());
  },[dispatch])
  


  const deleteCommentHandler = (id) => {

    swal({
      title: "Are you sure?",
      text: "you will delete this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
  dispatch(deleteComment(id))
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
              {comments?.map((comment , index) => 
              <tr key={comment}>
              <td>{index + 1}</td>
              <td>
                <div className="table-image">
                <img src={comment?.user?.profilePhoto?.url} alt="" className="user-image" />
                <span className="table-username">{comment?.user?.userName}</span>
                </div>
              </td>
              <td>{comment?.text}</td>
              <td>
                <div className="table-button-group">
            
                  <button onClick={ () => deleteCommentHandler(comment._id)}>Delete Comment</button>
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