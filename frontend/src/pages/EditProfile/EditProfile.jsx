import "./EditProfile.css";

import { uploads } from "../../components/utils/config";

//hooks
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//redux
import { profile, resetMessage } from "../../components/slices/userSlice";

//components
import Message from "../../components/Message";

const EditProfile = () => {
  const dispatch = useDispatch();

  const { user, message, error, loading } = useSelector((state) => state.user);

  // states nome, email,password,  profileimg, bio,previewimg
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // fill form with user data
  useEffect(() => {
    if(user){
      setName(user.name)
      setEmail(user.email)
      setBio(user.bio)
    }
  },[user])

  // user image
const handleFile = (e) => {
  const image = e.target.files[0]

  setPreviewImage(image)

  // update user profile
  setProfileImage(image)
}

  // load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div id="edit-profile">
      <h2>Edite seus dados</h2>
      <p className="subtitle">
        Adicione uma imagem de perfil e conte mais sobre você.
      </p>
      {(user.profileImage || previewImage) && (
        <img 
        src={previewImage ? URL.createObjectURL(previewImage): `${uploads}/users/${user.profile}`}
        alt={user.name}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <input type="email" disabled placeholder="E-mail" value={email || ""} />
        <label>
          <span>Imagem do Perfil</span>
          <input type="file" onChange={handleFile}/>
        </label>
        <label>
          <span>BIO: </span>
          <input
            type="text"
            placeholder="Descrição do Perfil"
            onChange={(e) => setBio(e.target.value)}
            value={bio || ""}
          />
        </label>
        <label>
          <span>Altere sua senha:</span>
          <input
            type="password"
            placeholder="Digite sua nova senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
        </label>
        <input type="submit" value="Atualizar" />
      </form>
    </div>
  );
};

export default EditProfile;
