StudentOS

Overview:

StudentOS is an AI-powered student productivity platform designed to help students plan, learn, and prepare for exams more effectively.

The platform integrates intelligent study planning, AI-assisted learning, task management, progress tracking, and productivity tools into a single dashboard. Its goal is to help students stay organized, improve study consistency, and achieve better academic outcomes through personalized learning support.


Features: 

1. AI Study Planner

* Generates personalized study schedules
* Creates day-by-day study plans
* Adapts schedules according to exam dates
* Provides revision strategies and recommendations

2. AI Learning Assistant

* Explains academic concepts
* Generates quizzes and multiple-choice questions
* Creates concise study notes
* Assists with coding and technical questions
* Supports exam preparation

3. Academic Dashboard

* Tracks study progress
* Monitors daily goals
* Maintains study streaks
* Provides weekly performance analytics

4. Task Management

* Create and manage study tasks
* Track task completion
* Organize daily academic activities

5. Pomodoro Timer

* Supports focused study sessions
* Encourages productive work cycles
* Tracks study duration

6. Achievement System

* Rewards study consistency
* Tracks experience points (XP)
* Unlocks achievement badges

7. Authentication

* User registration
* Secure login
* Session management


Technology Stack:

1. Frontend

* React
* TypeScript
* TanStack Router
* Tailwind CSS
* Lucide React
* Recharts

2. Backend

* Node.js
* Express.js

3. Database

* MongoDB Atlas

4. AI Integration

* Google Gemini API

5. Authentication

* Supabase Authentication



Project Structure


StudentOS/
│
├── studentosfrontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── studentos-backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md



Installation: 

STEP-1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/StudentOS.git
cd StudentOS
```

STEP-2: Frontend Setup

```bash
cd studentosfrontend
npm install
npm run dev
```

STEP-3: Frontend URL:

```text
http://localhost:5173
```

Backend Setup: 

```bash
cd studentos-backend
npm install
node server.js
```

Backend URL:

```text
http://localhost:5000
```


Environment Variables

STEP-1: Create a `.env` file inside the backend directory.

```env
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

STEP-2: Ensure that the `.env` file is excluded from version control.

```gitignore
.env
```


Future Enhancements

* AI-powered exam performance prediction
* Resume builder
* Placement preparation module
* Interview preparation assistant
* Real-time collaborative study rooms
* Personalised learning analytics
* Mobile application suppor



Impact: 

StudentOS helps students:

* Improve study consistency
* Reduce exam-related stress
* Create effective study schedules
* Learn concepts more efficiently
* Track academic progress
* Build productive study habits

DEMO
https://studentosfrontend.lovable.app

LICENSE
MIT LICENSE

