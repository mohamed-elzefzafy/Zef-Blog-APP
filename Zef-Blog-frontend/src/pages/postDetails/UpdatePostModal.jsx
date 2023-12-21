import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updatePost } from "../../redux/apiCalls/postApiCall";
import { getCategories } from "../../redux/apiCalls/categoryApiCall";

const UpdatePostModal = ({ setShowModal, post }) => {
  const [title, setTitle] = useState(post?.title);
  const [description, setDescription] = useState(post?.description);
  const [category, setCategory] = useState(post?.category?._id);
const dispatch = useDispatch();

  const submitHandler = (e) => {
e.preventDefault();
if (title.trim() === "") return toast.warning("please enter post title")
if (description.trim() === "") return toast.warning("please enter post description")
if (category === "") return toast.warning("please enter post category")

dispatch(updatePost(post?._id , {title , description , category}))
setShowModal(false);
  }

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const { categories } = useSelector((state) => state.category);

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
          {categories?.map((category) => (
            <option key={category?._id} value={category?._id}>{category?.title}</option>
          ))}
    
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
