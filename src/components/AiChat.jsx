import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { TypeAnimation } from 'react-type-animation';
import { BiSolidSend } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const AiChat = () => {
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
        <div className="min-h-screen bg-zinc-800 flex flex-col justify-center items-center space-y-4">
             <div className="bg-pink-300">
                {promptResponses.map((item, index) => (
                    <div key={index} className="qa-pair">
                        <div className="text-white">You: {item.question}</div>
                        <div className="text-white">AI: {item.answer}</div>
                    </div>
                ))}
            </div>
            <TypeAnimation
                sequence={['How can I assist you?', 1000]}
                wrapper="span"
                speed={40}
                style={{
                    fontSize: '2em',
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                }}
                repeat={Infinity}
            />
            <div className=''>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Type your query"
                    className="p-3 w-[40rem] rounded-md text-black rounded-e-full rounded-s-full relative"
                />
                <button onClick={getResponseForGivenPrompt}>
                    {loading ? 
                        <i className='text-black text-3xl absolute left-[77rem] top-[30.5rem]'><AiOutlineLoading3Quarters /></i>
                        :
                        <i className='text-black text-3xl absolute left-[77rem] top-[31rem]'><BiSolidSend /></i>
                    }
                </button>
            </div>
           
        </div>
    );
};

export default AiChat;
