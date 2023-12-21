import swal from "sweetalert";
import AdminSidebar from "./AdminSidebar";
import { useEffect } from "react";
import { deleteCategory, getCategories } from "../../redux/apiCalls/categoryApiCall";
import { useDispatch, useSelector } from "react-redux";


const CategoriesTablePage = () => {
  const dispatch = useDispatch();

    const {categories , loadingCategory} = useSelector(state => state.category);
  useEffect(() => {
    dispatch(getCategories());
    },[  dispatch])
    

    
  const deleteCategoryHandler = (id) => {

    swal({
      title: "Are you sure?",
      text: "you want to delete Category ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
       dispatch(deleteCategory(id))
      }
    });

  }
  return (
    <section className="table-container">
    <AdminSidebar/>
        <div className="table-wrabber">
          <h1 className="table-title">Categories</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Count</th>
                <th>Category Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((Category , index) => 
              <tr key={Category?._id}>
              <td>{index + 1}</td>
        
              <td>
            <b>{Category?.title}</b>
              </td>
              <td>
                <div className="table-button-group">
                  <button onClick={() => deleteCategoryHandler(Category?._id)}>Delete Category</button>
                </div>
              </td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
  )
}

export default CategoriesTablePage