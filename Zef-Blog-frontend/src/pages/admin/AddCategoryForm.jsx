import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createCategory } from "../../redux/apiCalls/categoryApiCall";

const AddCategoryForm = () => {
  const [title, setTitle] = useState("");
const dispatch = useDispatch();


  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.warning("please insert category");
    dispatch(createCategory({title}));
    setTitle("");
  };
  return (
    <div className="add-category">
      <h6 className="add-category-title">Add New Category</h6>
      <form onSubmit={formSubmitHandler}>
        <div className="add-category-form-group">
          <label htmlFor="title">Category title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter Category title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button type="submit" className="add-category-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
