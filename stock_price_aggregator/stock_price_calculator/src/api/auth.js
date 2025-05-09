// src/api/auth.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async () => {
  const res = await axios.post(`${BASE_URL}/register`, {
    email: import.meta.env.VITE_EMAIL,
    name: import.meta.env.VITE_NAME,
    mobileNo: "9044996218",
    githubUsername: "serv-er",
    rollNo: import.meta.env.VITE_ROLL_NO,
    collegeName: "KIET Group Of Institutions",
    accessCode: import.meta.env.VITE_ACCESS_CODE,
  });
  return res.data;
};

export const getToken = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/auth`, {
        email: import.meta.env.VITE_EMAIL,
        name: import.meta.env.VITE_NAME,
        rollNo: import.meta.env.VITE_ROLL_NO,
        accessCode: import.meta.env.VITE_ACCESS_CODE,
        clientID: import.meta.env.VITE_CLIENT_ID,
        clientSecret: import.meta.env.VITE_CLIENT_SECRET,
      });
      return res.data.access_token; // Ensure the token is returned correctly
    } catch (error) {
      console.error('Token fetch failed:', error.response ? error.response.data : error.message);
      throw new Error('Token fetch failed');
    }
  };
  
