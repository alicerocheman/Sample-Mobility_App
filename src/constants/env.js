export const API_URL = process.env.NODE_ENV === 'development'
  ? process.env.REACT_APP_API_URL_DEV
  : process.env.REACT_APP_API_URL_PROD;

export const SOCKET_PROTOCOL = process.env.NODE_ENV === 'development'
  ? process.env.REACT_APP_SOCKET_PROTOCOL_DEV
  : process.env.REACT_APP_SOCKET_PROTOCOL_PROD;

export const SERVICE_PROTOCOL = process.env.NODE_ENV === 'development'
  ? process.env.REACT_APP_SERVICE_PROTOCOL_DEV
  : process.env.REACT_APP_SERVICE_PROTOCOL_PROD;

export const ROOT_URL = process.env.NODE_ENV === 'development'
  ? process.env.REACT_APP_ROOT_URL_DEV
  : process.env.REACT_APP_ROOT_URL_PROD;

export const ON_HYBRID_APP = process.env.REACT_APP_ON_HYBRID_APP === 'true';

export const INTERCOM_APP_ID = process.env.REACT_APP_INTERCOM_APP_ID;

export const FCM_SENDER_ID = process.env.REACT_APP_FCM_SENDER_ID;
