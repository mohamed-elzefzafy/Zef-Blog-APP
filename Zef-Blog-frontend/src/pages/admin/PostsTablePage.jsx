
import swal from 'sweetalert';
import AdminSidebar from './AdminSidebar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deletePost, getAllPosts, getAllPostsWithoutPgeNumber } from './../../redux/apiCalls/postApiCall';



const PostsTablePage = () => {

  const dispatch = useDispatch();


  const { posts , loading}  = useSelector(state => state.post);

useEffect(() => {
  dispatch(getAllPostsWithoutPgeNumber());
  },[ dispatch])
  

  
  const deletePostHandler = (id) => {

    swal({
      title: "Are you sure?",
      text: "you will delete this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
      dispatch(deletePost(id))
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
            {posts?.map((post , index) => 
            <tr key={post._id}>
            <td>{index + 1}</td>
            <td>
              <div className="table-image">
              <img src={post?.user?.profilePhoto?.url} alt="" className="user-image" />
              <span className="table-username">{post?.user?.userName}</span>
              </div>
            </td>
            <td>{post?.title}</td>
            <td>
              <div className="table-button-group">
                <button>
                  <Link to={`/posts/details/${post?._id}`}>
                    View Post
                  </Link>
                </button>
                <button onClick={() => deletePostHandler(post?._id)}>Delete Post</button>
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