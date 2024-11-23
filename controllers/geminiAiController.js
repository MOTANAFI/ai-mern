// const asyncHandler = require("express-async-handler");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const asyncHandler = require("express-async-handler");
const ContentHistory = require("../models/ContentHistory");
const User = require("../models/User");


const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const genAIController = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  // const prompt = "write a story about a magic backpack"

  const result = await model.generateContent(prompt);
  const response = result.response;
  const content = response?.text().trim();

  // create history
  const newContent = await ContentHistory.create({
    user: req?.user?._id,
    content
  });
  // push the text to the user
  const userFound = await User.findById(req?.user?.id);
  userFound.history.push(newContent?._id);

  await userFound.save();

  // console.log(text)
  res.status(200).json(content);
});

module.exports = {
  genAIController,
};
