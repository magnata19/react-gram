import { api, requestConfig } from "../utils/config";

//publish an user photo
const publishPhoto = async (data, token) => {
  const config = requestConfig("POST", data, token, true);

  try {
    const res = await fetch(`${api}/photos`, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.error(error);
  }
};

//get user photos
const getUserPhotos = async (id, token) => {
  const config = requestConfig("GET", null, token);
  try {
    const res = await fetch(`${api}/photos/user/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.error(error);
  }
};

//delete a photo
const deletePhoto = async (id, token) => {
  const config = requestConfig("DELETE", null, token);
  try {
    const res = await fetch(`${api}/photos/${id}`,config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.error(error);
  }
};

// update a photo
const updatePhoto = async (data, id, token) => {
  const config = requestConfig('PUT', data, token)

  try {
    const res = await fetch(`${api}/photos/${id}`, config).then((res) => res.json()).catch((err) => err)
    return res;
  } catch (error) {
    console.error(error)
  }
}

const photoService = {
  publishPhoto,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
};

export default photoService;