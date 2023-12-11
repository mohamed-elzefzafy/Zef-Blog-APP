import { useState } from "react";
import "./addComment.css";
import { toast } from "react-toastify";

const AddComment = () => {
  const [text, setText] = useState("");
  
  const formSubmitHandler = (e) => {
e.preventDefault();
if (text.trim() === ""){
  return toast.warning("please insert comment");
}
console.log({text});
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
