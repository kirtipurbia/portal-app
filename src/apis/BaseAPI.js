
import axios from 'axios';
import { getIdToken } from '../utils/StorageUtil';
const { REACT_APP_LILAPI = ' http://localhost:5000/api/' } = process.env;
export const LILAPI = axios.create({
  baseURL: REACT_APP_LILAPI,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

export const instances = Object.freeze({
  LILAPI
});

const beforeRequest = config => {
  if (!config.headers.Authorization) {
    if (config.url.indexOf('/login') < 0) {
      const token = getIdToken();
      token && (config.headers.Authorization = token);
    }
  }
  return config;
};

// Add Interceptor for LILAPI
LILAPI.interceptors.request.use(beforeRequest, function(error) {
  console.log('error', error);
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
LILAPI.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error.response);
  }
);

export default class BaseAPI {
  constructor(baseRoute) {
    this._baseRoute = baseRoute;
    this._client = LILAPI;
  }

  post(route, postData, headers = {}) {
    return this._client.post(`${this._baseRoute}/${route}`, postData, headers);
  }

  put(route, putData) {
    return this._client.put(`${this._baseRoute}/${route}`, putData);
  }

  get(route, params) {
    return this._client.get(`${this._baseRoute}/${route}`, { params });
  }
}

