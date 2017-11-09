import { SERVICE_PROTOCOL, API_URL } from 'constants/env';

export const getPictureUrl = id =>
  `${SERVICE_PROTOCOL}${API_URL}/user/picture/${id}`;

export const getEmailPostfix = user => user.email.split('@')[1];
