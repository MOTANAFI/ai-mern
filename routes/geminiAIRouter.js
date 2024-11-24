const express = require("express");

const isAuthenticated = require("../middlewares/isAuthenticated");
const { genAIController } = require("../controllers/geminiAiController");
const checkApiReqLimit = require("../middlewares/checkApiReqLimit");

const geminiAIRouter = express.Router();

geminiAIRouter.post(
  "/generate-content",
  isAuthenticated,
  checkApiReqLimit,
  genAIController
);

module.exports = geminiAIRouter;
