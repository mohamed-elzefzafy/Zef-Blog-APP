import swal from "sweetalert";
import "./commentList.css";
import { useState } from "react";
import UpdateCommentModal from "./UpdateCommentModal";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/apiCalls/commentApiCall";

const CommentList = ({comments}) => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const {user} = useSelector((state) => state.auth);
  const [commentUpdate, setCommentUpdate] = useState("");
  const dispatch = useDispatch();
  const deleteCommentHandler = (comment) => {

    swal({
      title: "Are you sure?",
      text: "you want to delete this comment ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
  dispatch(deleteComment(comment._id))
      } else {
        // swal("something went wrong!");
      }
    });

  }

  const updateCommentHandler = (comment) => {
    setShowCommentModal(true)
    setCommentUpdate(comment)
  }
  return (
    <div className="comment-list">
<h4 className="comment-list-count">{comments?.length} comments</h4>
{comments?.map((comment) => 
<div key={comment?._id} className="comment-item">
<div className="comment-item-info">
<div className="comment-item-username">
{comment?.userName}
</div>
<div className="comment-item-time">
<Moment fromNow ago>
{comment?.createdAt}
</Moment> {" "} ago
    
</div>
</div>
<p className="comment-item-text">
  {comment?.text}
</p>
{comment.user === user?._id  ? (
  <div className="comment-items-icons-wrabber">
  <i className="bi bi-pencil-square" onClick={() => updateCommentHandler(comment)}></i>
  <i className="bi bi-trash-fill" onClick={() => deleteCommentHandler(comment)}></i>
</div>
  ) : null}


</div>
)}
{showCommentModal && <UpdateCommentModal commentUpdate={commentUpdate} setShowCommentModal={setShowCommentModal}/>}
    </div>
  )
}

export default CommentList;