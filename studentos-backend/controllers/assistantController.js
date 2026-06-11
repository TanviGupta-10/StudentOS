const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const askAssistant = async (req, res) => {
  try {
    const { message } = req.body;

    let prompt = `
You are StudentOS AI Assistant.

You help students with:
- DSA
- DBMS
- Operating Systems
- Computer Networks
- OOP
- Aptitude
- Coding
- Exam preparation
- Study planning

Student Question:
${message}
`;

    if (message.toLowerCase().includes("quiz")) {
      prompt = `
Generate a quiz based on:

${message}

Rules:
- Generate 5 questions.
- Number each question.
- Provide 4 options (A, B, C, D).
- Put all answers at the end under "Answer Key".
`;
    }

    if (message.toLowerCase().includes("mcq")) {
      prompt = `
Generate MCQs based on:

${message}

Rules:
- Generate 10 MCQs.
- Provide 4 options for each question.
- Put answers at the end.
`;
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    console.log("Question:", message);

    const result = await model.generateContent(prompt);

    res.json({
      success: true,
      reply: result.response.text(),
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      reply:
        "AI service is temporarily busy. Please try again later.",
    });
  }
};

module.exports = {
  askAssistant,
};