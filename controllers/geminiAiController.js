// const asyncHandler = require("express-async-handler");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const asyncHandler = require("express-async-handler");


const genAI = new GoogleGenerativeAI(process.env.API_KEY)

const genAIController = asyncHandler(async (req, res ) => {
    const {prompt} = req.body
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// const prompt = "write a story about a magic backpack"

const result = await model.generateContent(prompt);
const response = await result.response;
const text = response.text()
console.log(text)
})

module.exports = {
    genAIController
}