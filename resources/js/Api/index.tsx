import axios from "axios";

export const connect_string = 'http://127.0.0.1:8000/api/'

const cookies = document.cookie.split(';').map(cookie => cookie.trim());
export let token = '';
cookies.forEach(cookie => {
  const [name, value] = cookie.split('=');
  if (name === 'token') {
    token = value;
  }
});
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  config.headers.Authorization =  `Bearer ${token}`;
   
  return config;
});