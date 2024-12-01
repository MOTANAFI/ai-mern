const express = require("express");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
require("dotenv").config();
const usersRouter = require("./routes/usersRouter");
const { errorHandler } = require("./middlewares/errorMiddleware");
const geminiAIRouter = require("./routes/geminiAIRouter");
const stripeRouter = require("./routes/stripeRouter");
const User = require("./models/User");
require("./utils/connectDB")();

errorHandler;

const app = express();

const PORT = process.env.PORT || 5000;

//* crone for the trial period: run every single day

cron.schedule("0 0 * * * *", async () => {
  try {
    //*get the current data
    const today = new Date();
      await User.updateMany(
      {
        trialActive: true,
        trialExires: {$lt: today}
      },
      {
        trialActive: false,
        subscriptionPlan: "Free",
        monthlyRequestCount: 5
      }
    );
    
  } catch (error) {
    console.log(error)
  }
});

//* crone for the free plan : runs in the end of every month
cron.schedule("0 0 1 * * *", async () => {
    try {
      //*get the current data
      const today = new Date();
       await User.updateMany(
        {
          subscriptionPlan: "Free",
          nextBillingDate: {$lt: today}
        },
        {
          
          monthlyRequestCount: 0
        }
      );
      
    } catch (error) {
      console.log(error)
    }
  });
  //* Cron for the Basic plan: run at the end of every month
  cron.schedule("0 0 1 * * *", async () => {
    try {
      //*get the current data
      const today = new Date();
       await User.updateMany(
        {
          subscriptionPlan: "Baic",
          nextBillingDate: {$lt: today}
        },
        {
          
          monthlyRequestCount: 0
        }
      );
      
    } catch (error) {
      console.log(error)
    }
  });
  //* Cron for the Premium plan:  runs at the end of every month
  cron.schedule("0 0 1 * * *", async () => {
    try {
      //*get the current data
      const today = new Date();
     await User.updateMany(
        {
          subscriptionPlan: "Premium",
          nextBillingDate: {$lt: today}
        },
        {
          
          monthlyRequestCount: 0
        }
      );
      
    } catch (error) {
      console.log(error)
    }
  });
//* crone paid plan

//* --- middleware --

app.use(express.json());
app.use(cookieParser()); //* pass cooke automatically

//*=== Routes ====

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/geminiai", geminiAIRouter);
app.use("/api/v1/stripe", stripeRouter);
// -- middleware

app.use(errorHandler);
// start the server for sure

app.listen(PORT, console.log(`server running on ${PORT}`));
