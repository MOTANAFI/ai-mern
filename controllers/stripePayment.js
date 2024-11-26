const asyncHandler = require("express-async-handler");
const { calculateNextBillingDate } = require("../utils/calculateNextBillingDate");
const { shouldRenewSubsPlan } = require("../utils/shouldRenewSubsPlan");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
  console.log("free plan")
  //*Calculate the next billing date
  
  //* Check if user account should be renew or not
  try {
    if(shouldRenewSubsPlan(user)){
      //* Update the user account
      user.subscriptionPlan = 'Free';
      user.monthlyRequestCount = 5;
      user.apiRequestCount = 0;
      user.nextBillingDate = calculateNextBillingDate()
      //* save user to db
      await user.save();
      return res.json({
        status: 'success',
        message: "Subscription plan updated successfully", user
      })
      //* Create new payment and save into DB
      //* Send the response

    } else {
      return res.status(403).json({error: 'Subscription nenewal not duel yet'}, user)
    }

  }catch (error) {}
})


module.exports = {stripePayment, freeSubscription};
