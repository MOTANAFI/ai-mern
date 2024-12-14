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
  return response?.data;
};

//=========Check Auth
export const checkUserAuthStatusApi = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/v1/users/auth/check",
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

//========= user logout
export const logoutUserApi = async () => {
  const response = await axios.post(
    "http://localhost:5000/api/v1/users/logout",
    {},
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

//========= get user profile
export const getUserProfileApi = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/v1/users/profile",

    {
      withCredentials: true,
    }
  );
  return response?.data;
};
