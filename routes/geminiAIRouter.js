const express = require("express");

const isAuthenticated = require("../middlewares/isAuthenticated");
const { geminiAiConroller } = require("../controllers/geminiAiController");

const geminiAIRouter = express.Router();

geminiAIRouter.post("/generate-content", isAuthenticated, geminiAiConroller);

module.exports = geminiAIRouter;
