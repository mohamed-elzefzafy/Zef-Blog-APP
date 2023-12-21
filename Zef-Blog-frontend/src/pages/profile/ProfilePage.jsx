import { useEffect, useState } from "react";
import PostList from "../../components/posts/PostList";
import "./profile.css";
import { toast } from "react-toastify";
import swal from "sweetalert";
import UpdateProfileModal from "./UpdateProfileModal";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProfile,
  getUserProfile,
  uploadProfilePhoto,
} from "../../redux/apiCalls/profileApiCall";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const ProfilePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  useEffect(() => {
    dispatch(getUserProfile(id));
  }, [id]);

  const { profile , loading ,isProfileDeleted} = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);

  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("No image provided");

    const formData = new FormData();
    formData.append("image", file);
    dispatch(uploadProfilePhoto(formData));
  };

  const deleteProfileHandler = () => {
    swal({
      title: "Are you sure?",
      text: "you want to delete profile ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
     dispatch(deleteProfile(user?._id))
     dispatch(logoutUser());
      }
    });
  };


//   if (loading) {
// return (
//   <div className="profile-loader">
// <Oval
//   height={120}
//   width={120}
//   color="#000"
//   wrapperStyle={{}}
//   wrapperClass=""
//   visible={true}
//   ariaLabel='oval-loading'
//   secondaryColor="gray"
//   strokeWidth={3}
//   strokeWidthSecondary={3}

// />
// </div>
// )
//   }


  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrabber">
          <img
            src={file ? URL.createObjectURL(file) : profile?.profilePhoto?.url}
            alt=""
            className="profile-image"
          />
      {profile?._id  === user?._id  &&
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
      }
    
        </div>
        <h1 className="profile-username">{profile?.userName}</h1>
        <p className="profile-bio">{profile?.bio}</p>
        <div className="user-date-joined">
          <strong>Date joined : </strong>
          <span>{new Date(profile?.createdAt).toDateString()}</span>
        </div>
        {profile?._id  === user?._id  && 
          <button
          onClick={() => setShowModal(true)}
          className="profile-update-btn"
        >
          <i className="bi bi-file-person-fill"></i>
          Update profile
        </button>
        }
      
      </div>
      <div className="profile-posts-list">
    {profile?.posts?.length  === 0 ? (<h2 className="profile-post-list-title">Thers no posts for {profile?.userName}</h2>) : (
      <h2 className="profile-post-list-title">{profile?.userName} Posts 
         ( {profile?.posts?.length}  {profile?.posts?.length === 1 ? "post" : "posts"})</h2>
    )}
        <PostList posts={profile?.posts} />
      </div>

      {profile?._id  === user?._id  && 
        <button onClick={deleteProfileHandler} className="delete-account-btn">
        Delete Your Account
      </button>
      }
  
      {showModal && (
        <UpdateProfileModal setShowModal={setShowModal} profile={profile} />
      )}
    </section>
  );
};

export default ProfilePage;
