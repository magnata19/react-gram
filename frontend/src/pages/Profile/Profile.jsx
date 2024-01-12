import "./Profile.css";

import { uploads } from "../../components/utils/config";

//components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

//hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

//redux
import { getUserDetails } from "../../components/slices/userSlice";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);

  //new form and edit form refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();


  //load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  if(loading) {
    return <p>Carregando...</p>
  }

  const submitHandle = (e) => {
    e.preventDefault()
  }

  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name}/>
        )}
        <div className="profile-description">
          <h1>{user.name}</h1>
          <p>{user.bio}</p>
        </div>
      </div>
      {id === userAuth._id && (
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Compartilhe algum momento especial: </h3>
            <form onSubmit={submitHandle}>
              <label>
                <span>Título para Foto</span>
                <input type="text" placeholder="Insira um título"/>
              </label>
              <label>
                <span>Imagem: </span>
                <input type="file"/>
              </label>
              <input type='submit' value='Postar' />
            </form>
          </div>
        </>
      )} 
    </div>
  );
};

export default Profile;
