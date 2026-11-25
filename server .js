
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("Class 9 Backend is running!");
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Please enter a question"
      });
    }

    const response = await openai.responses.create({
      model: "gpt-5.5",
      instructions: "You are a helpful Class 9 tutor. Explain in simple English or Urdu.",
      input: message
    });

    res.json({
      answer: response.output_text
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "AI service unavailable"
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Class 9 backend started!");
});
