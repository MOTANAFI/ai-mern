const express = require("express");

const isAuthenticated = require("../middlewares/isAuthenticated");
const { genAIController } = require("../controllers/geminiAiController");


const geminiAIRouter = express.Router();

geminiAIRouter.post("/generate-content", isAuthenticated, genAIController);

module.exports = geminiAIRouter;
