
import swal from 'sweetalert';
import { posts } from './../../dummyData';
import AdminSidebar from './AdminSidebar';
import { Link } from 'react-router-dom';



const PostsTablePage = () => {
  
  const deletePostHandler = () => {

    swal({
      title: "Are you sure?",
      text: "you will delete this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Post has been deleted!", {
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
        <h1 className="table-title">Posts</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Post Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post , index) => 
            <tr key={post._id}>
            <td>{index + 1}</td>
            <td>
              <div className="table-image">
              <img src="/images/user-avatar.png" alt="" className="user-image" />
              <span className="table-username">{post.user.username}</span>
              </div>
            </td>
            <td>{post.title}</td>
            <td>
              <div className="table-button-group">
                <button>
                  <Link to={`details/${post._id}`}>
                    View Post
                  </Link>
                </button>
                <button onClick={deletePostHandler}>Delete Post</button>
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

export default PostsTablePage;