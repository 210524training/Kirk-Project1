import axios from 'axios';

// You can create an axios configuration for specific remote APIs with baseline
// configuration options
// These can generally be overridden when sending individual requests


const trmsClient = axios.create({
  baseURL: process.env.REACT_APP_ENVIRONMENT === 'local' ? 'http://localhost:4000' :'http://localhost:4000' ,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default trmsClient;
