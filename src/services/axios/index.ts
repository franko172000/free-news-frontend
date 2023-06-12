import axios from 'axios'
import store from 'store';
import {AUTH_STORAGE_KEY} from "../../constants";

const baseURL = 'http://localhost:8070/api/';

const storage = store.get(AUTH_STORAGE_KEY)

const apiClient = axios.create({
  baseURL,
  headers:{
    Authorization: storage ? `Bearer ${storage.token}` : null,
    Accept: 'application/json',
    "Content-Type": 'application/json'
  }
})

apiClient.interceptors.response.use(undefined, error => {
  const { data, status, statusText } = error.response
  if (data) {
    if(data.errorCode === 'UNAUTHORIZED_ERROR' && error.response.status === 401){
        store.remove(AUTH_STORAGE_KEY);
        window.location.href = '/auth/login';
    }
  }
  return Promise.reject({
    data,
    statusCode: status,
    statusText,
  })
})
//
// const processError = (errors)=>{
//
//   let message = "";
//   errors.map(val=>{
//     message+= Object.values(val)[0] + "\n";
//   })
//
//   return message;
// }

export default apiClient
