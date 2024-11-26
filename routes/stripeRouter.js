const express = require("express");

const isAuthenticated = require("../middlewares/isAuthenticated");
const {stripePayment, freeSubscription} = require("../controllers/stripePayment");

const stripeRouter = express.Router();

stripeRouter.post("/checkout", isAuthenticated, stripePayment);
stripeRouter.post("/free-plan", isAuthenticated, freeSubscription);

module.exports = stripeRouter;
