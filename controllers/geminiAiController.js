// const asyncHandler = require("express-async-handler");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the GoogleGenerativeAI instance
const genAI = new GoogleGenerativeAI(
  process.env.API_KEY // Ensure the API key is loaded correctly
);

// Function to generate content
const geminiAiConroller = async (req, res) => {
  try {
    // Define prompt and configuration
    const { prompt } = req.body;
    // const config = {
    //   temperature: 0.9,
    //   topP: 1,
    //   topK: 1,
    //   maxOutputTokens: 4096,
    // };

    // Specify the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content
    const result = await model.generateContent(prompt);

    // Log the response text
    console.log(result.response?.text || "No response generated.");
    res.status(200).json({ content: result.response?.text || "No content generated." });
  } catch (error) {
    // Log the error details
    console.error("Error generating content:", error.message);
  }
  res
};

// Execute the generation
module.exports = {
  geminiAiConroller,
};
