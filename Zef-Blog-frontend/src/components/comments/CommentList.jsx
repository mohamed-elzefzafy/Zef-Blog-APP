import swal from "sweetalert";
import "./commentList.css";
import { useState } from "react";
import UpdateCommentModal from "./UpdateCommentModal";

const CommentList = () => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const deleteCommentHandler = () => {

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Your Comment has been deleted!", {
          icon: "success",
        });
      } else {
        // swal("something went wrong!");
      }
    });

  }
  return (
    <div className="comment-list">
<h4 className="comment-list-count">2 comments</h4>
{[1 , 2].map((comment) => 
<div key={comment} className="comment-item">
<div className="comment-item-info">
<div className="comment-item-username">
  mohahmed zezafy
</div>
<div className="comment-item-time">
2 hours ago
</div>
</div>
<p className="comment-item-text">
  this amazing
</p>
<div className="comment-items-icons-wrabber">
  <i className="bi bi-pencil-square" onClick={() => setShowCommentModal(true)}></i>
  <i className="bi bi-trash-fill" onClick={deleteCommentHandler}></i>
</div>
</div>
)}
{showCommentModal && <UpdateCommentModal setShowCommentModal={setShowCommentModal}/>}
    </div>
  )
}

export default CommentList;