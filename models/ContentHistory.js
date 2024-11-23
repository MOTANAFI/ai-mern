const mongoose = require("mongoose");

//*Schema

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
   
  },
  {
    timestamps: true,
  }
);

//! Compile to form the model -- mern-ai-2015-1

const ContentHistory = mongoose.model("ContentHistory", historySchema);

module.exports = ContentHistory
