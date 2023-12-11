import "./createPost.css";
import { useState } from "react";
import { toast } from "react-toastify";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  const formSubmitHandler = (e) => {
e.preventDefault();
if (title.trim() === "") return   toast.warning("post title is required");
if (description.trim() === "") return  toast.warning("post description is required");
if (category.trim() === "") return  toast.warning("post category is required");
if (!file) return  toast.warning("post file is required");

const formData = new FormData();
formData.append("title" , title);
formData.append("description" , description);
formData.append("category" , category);
formData.append("image" , file);
// @todo send formData to server 

console.log({title , description  , category   , file});
  }
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
          <option value="music">music</option>
          <option value="coffee">coffee</option>
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
          Create Post
        </button>
      </form>
    </section>
  );
};

export default CreatePostPage;
