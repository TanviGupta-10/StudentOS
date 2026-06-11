// Shared mock data for StudentOS
export const subjects = [
  { name: "Mathematics", color: "var(--purple)", progress: 72 },
  { name: "Physics", color: "var(--cyan)", progress: 58 },
  { name: "Chemistry", color: "var(--success)", progress: 81 },
  { name: "Biology", color: "var(--warning)", progress: 45 },
  { name: "History", color: "oklch(0.68 0.2 340)", progress: 64 },
];

export const upcomingExams = [
  { subject: "Mathematics", date: "Jun 18, 2026", daysLeft: 8, difficulty: "Hard" },
  { subject: "Physics", date: "Jun 24, 2026", daysLeft: 14, difficulty: "Medium" },
  { subject: "Chemistry", date: "Jul 02, 2026", daysLeft: 22, difficulty: "Medium" },
];

export const todaysTasks = [
  { id: "1", title: "Calculus — Integration practice", subject: "Mathematics", priority: "high", done: false, due: "Today" },
  { id: "2", title: "Read Chapter 7: Thermodynamics", subject: "Physics", priority: "medium", done: false, due: "Today" },
  { id: "3", title: "Flashcards — Organic reactions", subject: "Chemistry", priority: "low", done: true, due: "Today" },
  { id: "4", title: "Write history essay outline", subject: "History", priority: "medium", done: false, due: "Tomorrow" },
  { id: "5", title: "Biology lab report draft", subject: "Biology", priority: "high", done: false, due: "Fri" },
];

export const weeklyProgress = [
  { day: "Mon", hours: 3.2, goal: 4 },
  { day: "Tue", hours: 4.5, goal: 4 },
  { day: "Wed", hours: 2.1, goal: 4 },
  { day: "Thu", hours: 5.0, goal: 4 },
  { day: "Fri", hours: 3.8, goal: 4 },
  { day: "Sat", hours: 6.2, goal: 4 },
  { day: "Sun", hours: 4.1, goal: 4 },
];

export const aiRecommendations = [
  { title: "Review weak topic: Integration by Parts", reason: "Quiz accuracy dropped 18% this week" },
  { title: "Schedule a 25-min Pomodoro for Chemistry", reason: "You're on a 6-day streak — keep momentum" },
  { title: "Try a practice exam for Physics", reason: "Exam in 14 days, mock tests boost retention" },
];

export const motivationalQuotes = [
  { quote: "Small daily improvements are the key to staggering long-term results.", author: "Robin Sharma" },
  { quote: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { quote: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
];

export const achievements = [
  { name: "7-Day Streak", icon: "🔥", earned: true },
  { name: "Early Bird", icon: "🌅", earned: true },
  { name: "Math Wizard", icon: "🧙", earned: true },
  { name: "100 Hours", icon: "⏰", earned: false },
  { name: "Perfect Week", icon: "⭐", earned: false },
  { name: "Quiz Master", icon: "🏆", earned: true },
];

export const studyPlan = [
  { time: "08:00 – 09:30", subject: "Mathematics", topic: "Integration practice", priority: "high" },
  { time: "10:00 – 11:00", subject: "Physics", topic: "Thermodynamics — Chapter 7", priority: "high" },
  { time: "13:00 – 14:00", subject: "Chemistry", topic: "Organic reactions flashcards", priority: "medium" },
  { time: "15:00 – 16:00", subject: "Biology", topic: "Cellular respiration review", priority: "medium" },
  { time: "17:00 – 17:30", subject: "History", topic: "Essay outline", priority: "low" },
];

export const subjectHours = [
  { subject: "Math", hours: 12.5 },
  { subject: "Physics", hours: 9.2 },
  { subject: "Chem", hours: 8.0 },
  { subject: "Bio", hours: 5.4 },
  { subject: "History", hours: 4.1 },
];

export const user = {
  name: "Alex Morgan",
  level: 14,
  xp: 2840,
  xpToNext: 3500,
  streak: 12,
  totalHours: 187,
};
