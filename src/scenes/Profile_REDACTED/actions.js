import * as types from 'constants/actionTypes';
import * as paths from 'constants/actionPaths';
import axios from 'axios';

export const userUpdate = profile => ({
  type: types.USER_UPDATE,
  payload: axios.post(paths.USER_UPDATE, {
    ...profile
  })
});

export const userPhotoUpdate = (id, file) => ({
  type: types.USER_PHOTO_UPDATE,
  payload: axios.post(`${paths.USER_PHOTO_UPDATE}${id}`, file)
});

export const userPhotoDelete = () => ({
  type: types.USER_PHOTO_DELETE,
  payload: axios.delete(paths.USER_PHOTO_DELETE)
});

export const userPictureUpdate = (id, file) => ({
  type: types.USER_PICTURE_UPDATE,
  payload: axios.put(paths.USER_PICTURE_UPDATE + id, file, {
    headers: {
      'Content-Disposition': `attached; filename="${file.name}"`,
      'Content-Type': 'image/*'
    }
  })
});
export const userPictureDelete = id => ({
  type: types.USER_PICTURE_DELETE,
  payload: axios.delete(paths.USER_PICTURE_DELETE + id)
});

export const userUpdatePreference = args => {
  return {
    type: types.USER_UPDATE_PREFERENCE,
    payload: axios.post(paths.USER_UPDATE_PREFERENCE, args)
  };
};
