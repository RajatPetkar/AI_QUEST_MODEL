const mongoose = require("mongoose");
const { spawn } = require("child_process");

// MongoDB connection URI
const MONGO_URI = "mongodb+srv://rajatpetkar250:Tp26PLRr6Acha09d@quizdel.tkjtg.mongodb.net/";

// Define your schema (similar to the one in Mongoose)
const questionSchema = new mongoose.Schema({
  questionTitle: String,
  questionBody: String,
  questionTags: [String],
  noOfAnswers: Number,
  upVote: [String],
  downVote: [String],
  userPosted: String,
  userId: String,
  askedOn: Date,
  answer: [
    {
      answerBody: String,
      userAnswered: String,
      userId: String,
      answeredOn: Date,
    },
  ],
});

// Define the model
const Question = mongoose.model("Question", questionSchema);

// Connect to MongoDB and fetch data
async function fetchDataAndSendToPython() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    // Fetch all questions
    const questions = await Question.find();
    console.log("Fetched questions:", questions);

    // Pass data to Python script
    const pythonProcess = spawn("python", ["./processData.py", JSON.stringify(questions)]);

    pythonProcess.stdout.on("data", (data) => {
      console.log(`Python output: ${data}`);
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Python error: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      console.log(`Python process exited with code ${code}`);
      mongoose.connection.close(); // Close the MongoDB connection after execution
    });
  } catch (error) {
    console.error("Error connecting to MongoDB or processing data:", error);
  }
}

fetchDataAndSendToPython();
module.exports = fetchDataAndSendToPython;
