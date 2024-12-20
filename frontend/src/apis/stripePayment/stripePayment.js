import axios from "axios";

// ==== STRLIPE PAYMENT ========
export const handleFreeSubscriptionAPI = async (userPrompt) => {
  const response = await axios.post(
    "http://localhost:5000/api/v1/stripe/free-plan",
    {},
    {
      withCredentials: true,
    }
  );

  return response?.data;
};
