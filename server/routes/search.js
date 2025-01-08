import express from 'express'
const router = express.Router()
import Questions from "../models/questions.js";

router.get('/search', async (req, res) => {
  const { query } = req.query;

  try {
    const questions = await Questions.find({
      $or: [
        { title: { $regex: query, $options: "i" } },    
        { tags: { $regex: query, $options: "i" } }, 
      ],
    });
    res.json(questions);
  } catch (error) {
    console.error("Error in search:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
