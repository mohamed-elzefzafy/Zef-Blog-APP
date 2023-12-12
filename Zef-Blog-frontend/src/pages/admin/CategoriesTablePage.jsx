import swal from "sweetalert";
import AdminSidebar from "./AdminSidebar";
import { categories } from "../../dummyData";


const CategoriesTablePage = () => {

  const deleteCategoryHandler = () => {

    swal({
      title: "Are you sure?",
      text: "you will delete this Category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Category has been deleted!", {
          icon: "success",
        });
      } else {
        // swal("something went wrong!");
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
              {categories.map((Category , index) => 
              <tr key={Category._id}>
              <td>{index + 1}</td>
        
              <td>
            <b>{Category.title}</b>
              </td>
              <td>
                <div className="table-button-group">
                  <button onClick={deleteCategoryHandler}>Delete Category</button>
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