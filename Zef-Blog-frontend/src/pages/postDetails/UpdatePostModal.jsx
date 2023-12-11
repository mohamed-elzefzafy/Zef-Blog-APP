import { useState } from "react";
import { toast } from "react-toastify";

const UpdatePostModal = ({ setShowModal, post }) => {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [category, setCategory] = useState(post.category);

  const submitHandler = (e) => {
e.preventDefault();
if (title.trim() === "") return toast.warning("please enter post title")
if (description.trim() === "") return toast.warning("please enter post description")
if (category.trim() === "") return toast.warning("please enter post category")
console.log({title , description , category});
  }
  return (
    <div className="update-modal">
      <form onSubmit={submitHandler} className="update-modal-form">
        <abbr title="close">
          <i
            className="bi bi-x-circle-fill update-modal-form-close"
            onClick={() => setShowModal(false)}
          ></i>
        </abbr>
        <h1 className="update-modal-title">Update Post</h1>
        <input
          type="text"
          className="update-modal-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select className="update-modal-input"
         value={category}
          onChange={(e) => setCategory(e.target.value)}>
          <option disabled value="">
            Select A Category
          </option>
          <option value="music">music</option>
          <option value="travelling">travelling</option>
        </select>
        <textarea
          className="update-modal-textarea"
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit" className="update-modal-btn">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePostModal;
