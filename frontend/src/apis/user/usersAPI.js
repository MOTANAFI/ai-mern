//* Registration

import axios from "axios";

//*  User registration 
export const registerAPI = async (userData) => {
  const response = await axios.post(
    "http://localhost:5000/api/v1/users/register",
    {
      email: userData?.email,
      password: userData?.password,
      username: userData?.username,
    },
    {
      withCredentials: true,
    }
  );
  console.log("api response", response?.data);
  return response?.data;
};

//*  User Loggin
export const loginAPI = async (userData) => {
  const response = await axios.post(
    "http://localhost:5000/api/v1/users/login",
    {
      email: userData?.email,
      password: userData?.password,
    },
    {
      withCredentials: true,
    }
  );
  console.log("api response", response?.data);
  return response?.data;
};

//=========Check Auth
export const checkUserAuthStatusApi = async (userData) => {
  const response = await axios.get(
    "http://localhost:5000/api/v1/users/auth/check",
    {
      withCredentials: true,
    }
  );
  console.log("api response", response?.data);
  return response?.data;
};
