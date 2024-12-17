import axios from "axios";

export const generateContentAPI = async (userPrompt) => {
  const response = await axios.post(
    "http://localhost:5000/api/v1/geminiai/generate-content",
    {
      prompt: userPrompt,
    },
    {
      withCredentials: true,
    }
  );

  return response?.data;
};
