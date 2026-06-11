const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("StudentOS Backend Running");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/gemini", require("./routes/geminiRoutes"));
app.use("/api/assistant", require("./routes/assistantRoutes"));
app.listen(5000, () => {
  console.log("Server started on port 5000");
});