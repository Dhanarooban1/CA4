import React, { useState, createContext ,useEffect } from 'react';
import questions from './questions';
import '../App.css';
import logo from './Assets/science.png'
const ThemeContext = createContext('light');
export default function QuestionBox() {
  const [CurrentQus, SetQues] = useState(0);
  const [score, setScore] = useState(0);
  const [theme, setTheme] = useState('light');
  const [questionBackgroundColor, setQuestionBackgroundColor] = useState('inherit');

  useEffect(()=>{
    document.body.className = theme;
  },[theme]);
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  const handleQuestion = () => {
    SetQues(CurrentQus + 1);
  };

  const handleAnswer = (isCorrect) => {
    isCorrect ? setScore(score + 1) : null;
    handleQuestion();
  };

  const toggleQuestionBackgroundColor = () => {
    const newColor = questionBackgroundColor === 'inherit' ? 'red' : 'inherit';
    setQuestionBackgroundColor(newColor);
  };

  let  percentage = Math.floor((score /questions.length) * 100);

  const moveQuestion = questions[CurrentQus];
  return (
    <ThemeContext.Provider value={theme}>
      <img id="logo" src={logo} alt="" />
      <div className="Quiz-Container">
        {moveQuestion && (
          <div id="Box" style={{ backgroundColor: theme === 'dark' ? '#6e6969ff' : '#000000' }}>
            <div id="QuestionNumber" className="QuestionNumber" style={{display:'flex', padding:'10px',margin:'10px'}}>
              <div id="Current_Question_Number">{CurrentQus + 1}</div>
              <div>of</div>
              <div id="Total_Question">{questions.length}</div>
            </div>
            <p  style={{ color: questionBackgroundColor }} className="Question_text">{moveQuestion.text}</p>
            <div className="option-Container">
            <button id='buttons' onClick={toggleQuestionBackgroundColor}>Toggle Question Background Color</button>
            <button id='button' onClick={toggleTheme}>Toggle Theme</button>
              <div className="option-row">
                {moveQuestion.options.map((option, index) => (
                  <div className="displayGrid" key={index}>
                    <p onClick={() => handleAnswer(option.isCorrect)} style={{width:'100%'}}>
                      {option.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {!moveQuestion && (
          <div id='ResultPage'>
            <h1>Score: {score}</h1>
            <h1 id='Your_Score'>Your Percentage is {percentage}</h1>
            <h1>{percentage >60 ? "GOOD LUCK" : "TRY BETTER ON NEXT TIME"}</h1>
            <button id='playAgainBtn' onClick={() => {
              window.location.reload();
            }}>Play Again</button>
            <h2>End of Quiz</h2>
          </div>
        )}
      </div>
    </ThemeContext.Provider>
  );
}
