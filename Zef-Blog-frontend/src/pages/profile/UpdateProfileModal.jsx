import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateProfileData } from '../../redux/apiCalls/profileApiCall';



// const user = {
//   userName : "Mohamed elzefzafy",
//   bio : "hi i'm mohamed elzefzafy i'm developer"
// }
const UpdateProfileModal = ({setShowModal , profile}) => {
  const {user} = useSelector((state) => state.auth)
  const [userName, setUserName] = useState(profile?.userName);
  const [bio, setBio] = useState(profile?.bio);
  const [password, setPassword] = useState("");


  const dispatch = useDispatch();

  const submitHandler = (e) => {
e.preventDefault();

const updatedUser = {userName , bio}
if (password.trim() !== "")
{
  updatedUser.password = password;
}

dispatch(updateProfileData(profile?._id , updatedUser))
setShowModal(false);
  }
  return (
    <div className="update-modal">
      <form onSubmit={submitHandler} className="update-modal-form">
        <abbr title="close">
          <i
            className="bi bi-x-circle-fill update-modal-form-close"
            onClick={() => setShowModal(false)}
          ></i>
        </abbr>
        <h1 className="update-modal-title">Update profile</h1>
        <input
          type="text"
          className="update-modal-input"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder='User Name'
        />

<input
          type="text"
          className="update-modal-input"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder='bio'
        />

<input
          type="password"
          className="update-modal-input"
          value={password}
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="update-modal-btn">
          Update profile
        </button>
      </form>
    </div>
  )
}

export default UpdateProfileModal