import "./postDetails.css";
import { Link, useParams } from "react-router-dom";
import { posts } from "../../dummyData";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import swal from "sweetalert";
import UpdatePostModal from "./UpdatePostModal";
import UpdateCommentModal from "../../components/comments/UpdateCommentModal";


const PostDetailsPage = () => {
  const {id} = useParams();
  const post = posts.find((postItem) => postItem._id === parseInt(id));
const [file, setFile] = useState(null);
const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    window.scrollTo(0, 0);
      },[])

  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) {
    return  toast.warning("ther's no image provided");
    }
    console.log(file);
  }

  const deletePostHandler = () => {

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Your post has been deleted!", {
          icon: "success",
        });
      } else {
        // swal("something went wrong!");
      }
    });

  }


  return (
    <section className="post-details">
      <div className="post-details-image-wrabber">
        <img src={file ?URL.createObjectURL(file) : post.image} alt="" className="post-details-image" />
        <form onSubmit={updateImageSubmitHandler} className="update-post-image-form">
          <label htmlFor="file" className="update-post-label">
            <i className="bi bi-image-fill"></i>
            Select New Image
          </label>
          <input style={{display: "none"}} type="file" name="file" id="file" onChange={(e) => setFile(e.target.files[0])}/>
          <button type="submit">Upload</button>
        </form>
      </div>
      <h1 className="post-details-title">{post.title}</h1>
      <div className="post-details-user-info">
        <img src={post.user.image} alt="" className="post-details-user-image" />
        <div className="post-details-user">
          <strong>
            <Link to={"/profile/1"}>{post.user.username}</Link>
          </strong>
          <span>{post.createdAt}</span>
        </div>
      </div>
      <p className="post-details-description">
        {post.description}
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae 
        animi quod ducimus? Nostrum aliquid, rem vel sint a voluptatem 
        nulla alias, molestias, ab quod ducimus! Tempore odit repellat 
        perspiciatis quaerat.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae 
        animi quod ducimus? Nostrum aliquid, rem vel sint a voluptatem 
        nulla alias, molestias, ab quod ducimus! Tempore odit repellat 
        perspiciatis quaerat.
      </p>
      <div className="post-details-icon-wrabber">
        <div>
         <i style={{marginRight : "3px"}} className="bi bi-hand-thumbs-up"></i>
         <small>{post.likes.length} likes</small>
          </div>
        <div style={{display :"flex"}}>
          <div className="bi bi-pencil-square" onClick={() => setShowModal(true)}></div>
          <div onClick={deletePostHandler} className="bi bi-trash-fill"></div>
        </div>
      </div>
    <AddComment/>
      <CommentList />
      {showModal &&  <UpdatePostModal post={post} setShowModal={setShowModal}/>}
  
      
    </section>
  )
}

export default PostDetailsPage;