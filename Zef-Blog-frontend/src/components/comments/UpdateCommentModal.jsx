import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateComment } from '../../redux/apiCalls/commentApiCall';


const UpdateCommentModal = ({commentUpdate ,setShowCommentModal}) => {
  const [text, setText] = useState(commentUpdate?.text);
   const dispatch = useDispatch();

  const submitHandler = (e) => {
e.preventDefault();
if (text.trim() === "") return toast.warning("please enter comment text")

dispatch(updateComment( commentUpdate._id , {text}));
setShowCommentModal(false);
  }
  return (
    <div className="update-modal">
    <form onSubmit={submitHandler} className="update-modal-form">
      <abbr title="close">
        <i
          className="bi bi-x-circle-fill update-modal-form-close"
          onClick={() => setShowCommentModal(false)}
        ></i>
      </abbr>
      <h1 className="update-modal-title">Edit Comment</h1>
      <input
        type="text"
        className="update-modal-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit" className="update-modal-btn">
        Edit Comment
      </button>
    </form>
  </div>
  )
}

export default UpdateCommentModal;