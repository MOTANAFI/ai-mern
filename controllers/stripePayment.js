const asyncHandler = require("express-async-handler");
const {
  calculateNextBillingDate,
} = require("../utils/calculateNextBillingDate");
const { shouldRenewSubsPlan } = require("../utils/shouldRenewSubsPlan");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/Payment");

//*---- Stripe payment

//* handle stripe payment

const stripePayment = asyncHandler(async (req, res) => {
  const { amount, subscriptionPlan } = req.body;

  //Get the user

  const user = req?.user;

  try {
    //create  payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "usd",
      // add some data to meta object
      metadata: {
        userId: user?._id?.toString(),
        userEmail: user?.email,
        subscriptionPlan,
      },
    });

    // send the response
    res.json({
      clientSecret: paymentIntent?.client_secret,
      paymentId: paymentIntent?.id,
      metadata: paymentIntent?.metadata,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//* handle free subs.

const freeSubscription = asyncHandler(async (req, res) => {
  //Get the loggin user
  const user = req?.user;
  console.log("free plan");
  //*Calculate the next billing date

  //* Check if user account should be renew or not
  try {
    if (shouldRenewSubsPlan(user)) {
      //* Update the user account
      user.subscriptionPlan = "Free";
      user.monthlyRequestCount = 5;
      user.apiRequestCount = 0;
      user.nextBillingDate = calculateNextBillingDate();
      //* Create new payment and save into DB
      const newPayment = await Payment.create({
        user: user?._id,
        subscriptionPlan: "Free",
        amount: 0,
        status: "success",
        reference: Math.random().toString(36).substring(7),
        monthlyRequestCount: 0,
        currency: "usd",
      });
      user.payments.push(newPayment?._id);
      //* save user to db
      await user.save();
      res.json({
        status: "success",
        message: "Subscription plan updated successfully",
        user,
      });
      //* Send the response
    } else {
      return res
        .status(403)
        .json({ error: "Subscription nenewal not due yet" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = { stripePayment, freeSubscription };
