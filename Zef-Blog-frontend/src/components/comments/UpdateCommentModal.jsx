import React, { useState } from 'react'
import { toast } from 'react-toastify';


const UpdateCommentModal = ({setShowCommentModal}) => {
  const [text, setText] = useState("amazing");


  const submitHandler = (e) => {
e.preventDefault();
if (text.trim() === "") return toast.warning("please enter comment text")

console.log({text});
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