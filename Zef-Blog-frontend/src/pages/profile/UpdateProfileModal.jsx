import  { useState } from 'react';



const user = {
  userName : "Mohamed elzefzafy",
  bio : "hi i'm mohamed elzefzafy i'm developer"
}
const UpdateProfileModal = ({setShowModal}) => {
  const [userName, setUserName] = useState(user.userName);
  const [bio, setBio] = useState(user.bio);
  const [password, setPassword] = useState("");


  const submitHandler = (e) => {
e.preventDefault();

const updatedUser = {userName , bio}
if (password.trim() !== "")
{
  updatedUser.password = password;
}
console.log(updatedUser);
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