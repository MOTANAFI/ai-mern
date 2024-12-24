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

// ==== STRLIPE PAYMENT INTENT ========
export const createStripePaymentIntentAPI = async ({ amount, plan }) => {
  console.log(amount, plan);
  const response = await axios.post(
    "http://localhost:5000/api/v1/stripe/checkout",
    {
      amount: Number(amount),
      subscriptionPlan: plan,
    },
    {
      withCredentials: true,
    }
  );

  return response?.data;
};

// ==== VERIFY PAYMENT INTENT ========
export const verifyPaymentAPI = async (paymentId) => {
  const response = await axios.post(
    `http://localhost:5000/api/v1/stripe/verify-payment/${paymentId}`,
    {},
    {
      withCredentials: true,
    }
  );

  return response?.data;
};
