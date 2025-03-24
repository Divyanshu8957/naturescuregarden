const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const connectDB = require("./config/db"); // Database connection
const PlantRoutes = require("./routes/PlantRoutes");
const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyAPMZKVoEV4-vPMvMlzHzbR_zQVlVW_LAo";

dotenv.config(); // ✅ Load environment variables

const app = express();
const _dirname = path.resolve();

// ✅ Middleware
app.use(express.json());
app.use(cors({
  origin: "https://virtualherbalgarden.onrender.com", // ⚠️ Frontend ka port (React ke liye 3000 ho sakta hai, Vite ke liye 5173)
  methods: ["POST", "GET"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

//  Connect to MongoDB
connectDB();

 

//  Plant Routes
app.use("/api/plants", PlantRoutes);

//  Home Route
app.get("/", (req, res) => {
  res.send("Welcome to Virtual Herbal Garden API 🌿");
});
if (!API_KEY) {
  console.error("❌ ERROR: Gemini API Key is missing in .env file!");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

// ✅ Updated Chatbot Route
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(message);
    const response = result.response;

    // Extract response text
    const aiResponse = response.text();

    res.json({ reply: aiResponse });
  } catch (error) {
    console.error("❌ Error fetching AI response:", error.message);
    res.status(500).json({ error: "Failed to fetch AI response." });
  }
});

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (_,res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});
//  Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
