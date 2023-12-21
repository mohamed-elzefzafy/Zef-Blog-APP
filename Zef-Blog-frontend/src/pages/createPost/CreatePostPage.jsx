import "./createPost.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createPost } from "../../redux/apiCalls/postApiCall";
import { getCategories } from "../../redux/apiCalls/categoryApiCall";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isPostCreated } = useSelector((state) => state.post);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.warning("post title is required");
    if (description.trim() === "")
      return toast.warning("post description is required");
    if (category.trim() === "")
      return toast.warning("post category is required");
    if (!file) return toast.warning("post file is required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", file);

    dispatch(createPost(formData));
  };

  useEffect(() => {
    if (isPostCreated) {
      toast.success("Post created");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [isPostCreated, navigate]);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const { categories } = useSelector((state) => state.category);

  return (
    <section className="create-post">
      <h1 className="create-post-title">Create New Post</h1>
      <form onSubmit={formSubmitHandler} className="create-post-form">
        <input
          type="text"
          placeholder="Post Title"
          className="create-post-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="create-post-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value="">
            Select Category
          </option>
          {categories?.map((category) => (
            <option value={category?._id}>{category?.title}</option>
          ))}
    
        </select>
        <textarea
          className="create-post-textarea"
          rows="5"
          placeholder="post description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="file"
          name="file"
          id="file"
          className="create-post-upload"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" className="create-post-btn">
          {loading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="30"
              visible={true}
            />
          ) : (
            "Create Post"
          )}
        </button>
      </form>
    </section>
  );
};

export default CreatePostPage;
