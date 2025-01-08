import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./HomeMainbar.css";
import QuestionList from "./QuestionList";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";

const HomeMainbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = 1;
  const questionsList = useSelector((state) => state.questionsReducer);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredQuestions = questionsList.data?.filter((question) => {
    const matchesSearchQuery = question.questionTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                               question.questionBody.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? question.questionTags.includes(selectedCategory) : true;
    return matchesSearchQuery && matchesCategory;
  });

  const checkAuth = () => {
    if (user === null) {
      alert("Login or Signup to ask a question");
      navigate("/Auth");
    } else {
      navigate("/AskQuestion");
    }
  };

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <button onClick={checkAuth} className="ask-btn">
          Ask Question
        </button>
      </div>
      <div className="filter-search-bar">
        <input
          type="text"
          placeholder="Search Questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-filter"
        >
          <option value="">Select Category</option>
          <option value="AI">AI</option>
          <option value="DEVELOPMENT">Development</option>
          <option value="API">API</option>
          <option value="OOP">OOP</option>

          <option value="DB">Database</option>
          <option value="DEVELOPMENT">Development</option>
          <option value="DS">Data Structure</option>
          <option value="BLOCKCHAIN">Blockchain</option>

          <option value="javascript">JavaScript</option>
          <option value="react">React</option>
          <option value="node">Node.js</option>
          <option value="json">json</option>


        </select>
      </div>
      <div>
        {questionsList.data === null ? (
          <Loader />
        ) : (
          <>
            <p>{filteredQuestions.length} questions</p>
            <QuestionList questionsList={filteredQuestions} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainbar;
