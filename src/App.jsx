import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './App.css';
import AiChat from './components/AiChat';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [promptResponses, setPromptResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI("AIzaSyCKhoblkz5pmVWRfIiMYIWdTbtb2VzSFms");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const getResponseForGivenPrompt = async () => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(inputValue);

      const response = result.response.text();
      setPromptResponses([
        ...promptResponses,
        { question: inputValue, answer: response }
      ]);
      setInputValue('');
      setLoading(false);
    } catch (error) {
      console.log(error);
      console.log("Something Went Wrong");
      setLoading(false);
    }
  };

   return (
    <AiChat/>
  //   <div className="app-container">
  //     <h1 className="app-header">Ask Me Anything!</h1>

  //     <div className="input-section">
  //       <input
  //         type="text"
  //         value={inputValue}
  //         onChange={handleInputChange}
  //         placeholder="Type your question here..."
  //         className="input-box"
  //       />
  //       <button onClick={getResponseForGivenPrompt} className="send-button">
  //         {loading ? 'Loading...' : 'Send'}
  //       </button>
  //     </div>

  //     <div className="response-section">
  //       {promptResponses.map((item, index) => (
  //         <div key={index} className="qa-pair">
  //           <div className="question">You: {item.question}</div>
  //           <div className="answer">AI: {item.answer}</div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  );
}

export default App;
