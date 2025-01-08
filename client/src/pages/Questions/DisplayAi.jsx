import React, { useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import HTMLReactParser from 'html-react-parser';
import axios from 'axios';

const DisplayAi = ({ question }) => {

  const [aiAnswer, setAiAnswer] = useState([]);
  const [webAnswer, setWebAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAiAnswer = async () => {
      try {
        setLoading(true);
        const response = await axios.post('https://ai-quest-model.onrender.com/ask', { question: question.questionBody , web:question.questionTitle} );
        console.log("Full API response:", response.data);

        const { similar_answers, web_answer } = response.data;

        // Check and update AI answers
        if (Array.isArray(similar_answers)) {
          const validAnswers = similar_answers.map(a => a.answer).filter(a => typeof a === 'string');
          setAiAnswer(validAnswers);
        }

        // Check and update Web answers
        if (typeof web_answer === 'string' && web_answer.trim() !== "") {
          setWebAnswer(web_answer);
        }
      } catch (error) {
        console.error('Error fetching AI answer:', error);
        toast.error('Failed to fetch AI answer.');
      } finally {
        setLoading(false);
      }
    };

    fetchAiAnswer();
  }, [question.questionTitle]);

  return (
    <div>
      <ul className="display-ans-list">
        {loading ? (
          <p>Loading AI-generated answer...</p>
        ) : (
          <>
            {/* Render AI-generated answers if any */}
            {aiAnswer.length > 0 && (
              <li className="display-ans ai-answer">
                <h4>AI-generated Similar Answers:</h4>
                {aiAnswer.map((answer, index) => (
                  <p key={index}>{HTMLReactParser(answer)}</p>
                ))}
              </li>
            )}

            {/* Render Web search answer */}
            {webAnswer ? (
              <li className="display-ans web-answer">
                <h4>Web Searched Answer:</h4>
                <p>{HTMLReactParser(webAnswer)}</p>
              </li>
            ) : (
              // If no AI answer and no web answer, display fallback
              aiAnswer.length === 0 && <p>No relevant web answer found.</p>
            )}
          </>
        )}
      </ul>
    </div>
  );
};

export default DisplayAi;
