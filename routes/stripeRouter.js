const express = require("express");

const isAuthenticated = require("../middlewares/isAuthenticated");
const stripePayment = require("../controllers/stripePayment");

const stripeRouter = express.Router();

stripeRouter.post("/checkout", isAuthenticated, stripePayment);

module.exports = stripeRouter;
