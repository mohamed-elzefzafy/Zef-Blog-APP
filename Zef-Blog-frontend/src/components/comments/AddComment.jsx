import { useState } from "react";
import "./addComment.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createComment } from "../../redux/apiCalls/commentApiCall";

const AddComment = ({postId}) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  
  const formSubmitHandler = (e) => {
e.preventDefault();
if (text.trim() === ""){
  return toast.warning("please insert comment");
}
dispatch(createComment({postId , text}));
setText("");
  }
  return (
    <form onSubmit={formSubmitHandler} className="add-comment">
      <input
        type="text"
        placeholder="Add Comment"
        className="add-comment-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="add-comment-btn">
        Comment
      </button>
    </form>
  );
};

export default AddComment;
