import { useEffect, useState } from "react";
import PostList from "../../components/posts/PostList";
import { posts } from "../../dummyData";
import "./profile.css";
import { toast } from "react-toastify";
import swal from "sweetalert";
import UpdateProfileModal from "./UpdateProfileModal";

const ProfilePage = () => {
  useEffect(() => {
    window.scrollTo(0 , 0);
  } ,[])
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("No image provided");
    console.log("image uploaded");
  }

  const deleteProfileHandler = () => {

    swal({
      title: "Are you sure?",
      text: "you want to delete profile ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Your profile has been deleted!", {
          icon: "success",
        });
      } else {
        // swal("something went wrong!");
      }
    });

  }

  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrabber">
          <img
            src={file ? URL.createObjectURL(file) : "/images/user-avatar.png"}
            alt=""
            className="profile-image"
          />
          <form onSubmit={formSubmitHandler}>
            <abbr title="">
              <label
                htmlFor="file"
                className="bi bi-camera-fill upload-profile-photo-icon"
              ></label>
            </abbr>
            <input
              type="file"
              name="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type="submit" className="upload-profile-photo-btn">
              Upload
            </button>
          </form>
        </div>
        <h1 className="profile-username">Mohamed elzefzafy</h1>
        <p className="profile-bio">hi i'm mohamed elzefzafy i'm developer</p>
        <div className="user-date-joined">
          <strong>Date joined : </strong>
          <span>fri nov 04 2023</span>
        </div>
        <button onClick={() => setShowModal(true)} className="profile-update-btn">
          <i className="bi bi-file-person-fill"></i>
          Update profile
        </button>
      </div>
      <div className="profile-posts-list">
        <h2 className="profile-post-list-title">Mohamed Posts</h2>
        <PostList posts={posts} />
      </div>
      <button onClick={deleteProfileHandler} className="delete-account-btn">Delete Your Account</button>
      {showModal && <UpdateProfileModal setShowModal={setShowModal}/>}
    </section>
  );
};

export default ProfilePage;
