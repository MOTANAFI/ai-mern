import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useParams, useSearchParams } from "react-router-dom";

const CheckoutForm = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const plan = params.plan;
  const amount = searchParams.get("amount");
  console.log(amount);
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (elements === null) {
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      return;
    }
    try {
      const data = {
        amount,
        plan,
      };
      // make the http request
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret:
          "pi_3QYNcBHeVvivlgAw04aJLKN0_secret_HYOox2JCy7mU7CBDLZrKBeRQG",
        confirmPayment: {
          return_url: "http://localhost:5173/success",
        },
      });
      if(error) {
        setErrorMessage(error.message)
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
    // prepare our data for payment
  };
  return (
    <div className="bg-gray-900 h-screen mt-4 flex justify-center items-center">
      <form className="w-96 mx-auto my-4 p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <PaymentElement />
          <button className="-mediuw-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm fontm text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Pay
          </button>
          {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
