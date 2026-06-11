const express = require("express");
const router = express.Router();

const {
  generateStudyPlan
} = require("../controllers/geminiController");

router.post("/study-plan", generateStudyPlan);

module.exports = router;