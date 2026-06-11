const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const generateStudyPlan = async (req, res) => {
  try {
    const {
      subjects,
      examDate,
      availableHours,
      difficulty,
    } = req.body;

    const today = new Date();
    const exam = new Date(examDate);

    const daysLeft = Math.max(
      0,
      Math.ceil(
        (exam - today) /
          (1000 * 60 * 60 * 24)
      )
    );

    if (daysLeft <= 0) {
      return res.json({
        success: true,
        studyPlan:
          "Your exam date is today or has already passed. Please select a future date.",
      });
    }

    const prompt = `
You are an expert study planner.

Today's Date: ${today.toDateString()}
Exam Date: ${examDate}
Days Remaining: ${daysLeft}

Subjects: ${subjects}
Available Study Hours Per Day: ${availableHours}
Difficulty: ${difficulty}

IMPORTANT:
- Create a study plan ONLY for ${daysLeft} days.
- Do NOT create yearly or multi-year plans.
- Do NOT assume preparation started in previous years.
- Give a day-by-day timetable.
- Give revision strategy.
- Keep the answer concise.
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result =
      await model.generateContent(prompt);

    res.status(200).json({
      success: true,
      studyPlan: result.response.text(),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generateStudyPlan,
};