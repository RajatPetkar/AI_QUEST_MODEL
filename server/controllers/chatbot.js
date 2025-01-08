import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API);

export const chatbotController = async (req, res) => {
  const { message } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(message + "in short and simple language");

    const responseText = result.response.text();

    res.status(200).json({
      message: responseText,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json("Something went wrong...");
  }
};
