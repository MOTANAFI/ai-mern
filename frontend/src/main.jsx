import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./AuthContext/AuthContext";

// stripe config
const stripePromise = loadStripe(
  "pk_test_51O0pKCHeVvivlgAw5Z8iuDjmw31djfvi9WtARMWwxICJNYIkygMEIrOa4Em1ns7dy9rBOag8gBcbGAvNPULCMfuk00stgp4lsa"
);
const options = {
  mode: "payment",
  amount: 50,
  currency: "usd"
};

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Elements stripe={stripePromise} options={options}>
          <App />
        </Elements>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
