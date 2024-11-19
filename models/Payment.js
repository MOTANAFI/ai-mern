const mongoose = require("mongoose");

//*Schema

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    reference: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: "pending",
      required: true,
    },
    subscriptionPlan: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },
    monthlyRequestCount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//! Compile to form the model

const Payment = mongoose.mongo("Payment", paymentSchema);