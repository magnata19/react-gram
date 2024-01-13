import "./Profile.css";

import { uploads } from "../../components/utils/config";

//components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsX, BsXLg } from "react-icons/bs";

//hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

//redux
import { getUserDetails } from "../../components/slices/userSlice";
import {
  publishPhoto,
  resetMessage,
  getUserPhotos,
} from "../../components/slices/photoSlice";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);

  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photo);

  //useState for photo
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  //new form and edit form refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  //load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  const handleFile = (e) => {
    const image = e.target.files[0];

    setImage(image);
  };

  const submitHandle = async (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    //build form data
    const formData = new FormData();

    Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );

    await dispatch(publishPhoto(formData));

    setTitle("");

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
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
                <input
                  type="text"
                  placeholder="Insira um título"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || ""}
                />
              </label>
              <label>
                <span>Imagem: </span>
                <input type="file" onChange={handleFile} />
              </label>
              {!loadingPhoto && <input type="submit" value="Postar" />}
              {loadingPhoto && (
                <input type="submit" value="Aguarde..." disabled />
              )}
              {errorPhoto && <Message msg={errorPhoto} type="error" />}
              {messagePhoto && <Message msg={messagePhoto} type="success" />}
            </form>
          </div>
        </>
      )}
      <div className="user-photos">
        <h2>Fotos publicadas: </h2>
        <div className="photos-container">
          {photos &&
            photos.map((photo) => (
              <div className="photo" key={photo._id}>
                {photo.image && (
                  <img
                    src={`${uploads}/photos/${photo.image}`}
                    alt={photo.title}
                  />
                )}
                {id === userAuth._id ? (
                  <div className="actions">       
                      <div className="svg-container"><Link to={`/photos/${photo._id}`}><BsFillEyeFill/></Link></div>
                      <div className="svg-container"><BsPencilFill /></div>
                      <div className="svg-container"><BsXLg/></div>                      
                  </div>
                ) : (
                  <Link className="btn" to={`/photos/${photo._id}`}>
                    {" "}
                    Ver{" "}
                  </Link>
                )}
              </div>
            ))}
          {photos.length === 0 && <p>Ainda não há fotos para serem vistas.</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
