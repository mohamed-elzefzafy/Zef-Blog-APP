import "./postDetails.css";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { posts } from "../../dummyData";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import swal from "sweetalert";
import UpdatePostModal from "./UpdatePostModal";
import UpdateCommentModal from "../../components/comments/UpdateCommentModal";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getOnePost, toggleLikePost, updatePostImage } from "../../redux/apiCalls/postApiCall";

const PostDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  // const post = posts.find((postItem) => postItem._id === parseInt(id));
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getOnePost(id));
  }, [id , showModal ]);



  

  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) {
      return toast.warning("ther's no image provided");
    }
    const formData = new FormData();
    formData.append("image" , file)
    dispatch(updatePostImage(post?._id , formData))
  };

  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "you want to delete this post ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?._id}`);
      } else {
        // swal("something went wrong!");
      }
    });
  };

  return (
    <section className="post-details">
      <div className="post-details-image-wrabber">
        <img
          src={file ? URL.createObjectURL(file) : post?.image?.url}
          alt=""
          className="post-details-image"
        />

        {post?.user?._id === user?._id && (
          <form
            onSubmit={updateImageSubmitHandler}
            className="update-post-image-form"
          >
            <label htmlFor="file" className="update-post-label">
              <i className="bi bi-image-fill"></i>
              Select New Image
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type="submit">Upload</button>
          </form>
        )}
      </div>
      <h1 className="post-details-title">{post?.title}</h1>
      <div className="post-details-user-info">
        <img
          src={post?.user?.profilePhoto?.url}
          alt=""
          className="post-details-user-image"
        />
        <div className="post-details-user">
          <strong>
            <Link to={`/profile/${post?.user?._id}`}>
              {post?.user?.userName}
            </Link>
          </strong>
          <span>{new Date(post?.createdAt).toDateString()}</span>
        </div>
      </div>
      <p className="post-details-description">
        {post?.description}
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae animi
        quod ducimus? Nostrum aliquid, rem vel sint a voluptatem nulla alias,
        molestias, ab quod ducimus! Tempore odit repellat perspiciatis quaerat.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae animi
        quod ducimus? Nostrum aliquid, rem vel sint a voluptatem nulla alias,
        molestias, ab quod ducimus! Tempore odit repellat perspiciatis quaerat.
      </p>
      <div className="post-details-icon-wrabber">
        <div>
          {user && (  
             (<i className={ post?.likes?.includes(user?._id) ?  "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"} 
                style={{marginRight : "3px"}} onClick={() => dispatch(toggleLikePost(post?._id))}></i>) 
          )}

          <small>{post?.likes?.length} likes</small>
        </div>
        {post?.user?._id === user?._id && (
          <div style={{ display: "flex" }}>
            <div
              className="bi bi-pencil-square"
              onClick={() => setShowModal(true)}
            ></div>
            <div onClick={deletePostHandler} className="bi bi-trash-fill"></div>
          </div>
        )}
      </div>
      {user &&  <AddComment postId={post?._id} /> }
      
      <CommentList comments={post?.comments} />
      {showModal && <UpdatePostModal post={post} setShowModal={setShowModal} />}
    </section>
  );
};

export default PostDetailsPage;
