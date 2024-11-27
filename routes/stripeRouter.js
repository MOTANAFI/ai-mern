const express = require("express");

const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  stripePayment,
  freeSubscription,
  verifyPayment,
} = require("../controllers/stripePayment");

const stripeRouter = express.Router();

stripeRouter.post("/checkout", isAuthenticated, stripePayment);
stripeRouter.post("/free-plan", isAuthenticated, freeSubscription);
stripeRouter.post("/verify-payment/:paymentId", isAuthenticated, verifyPayment);

module.exports = stripeRouter;
