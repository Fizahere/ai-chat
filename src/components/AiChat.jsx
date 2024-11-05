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

    const getResponseForGivenPrompt = async (e) => {
        try {
            e.preventDefault()
            if (!inputValue) {
                return
            }
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
        <div className=" p-6 min-h-screen bg-zinc-800 flex flex-col justify-center items-center space-y-4">
            {promptResponses.length > 0 && <p className='text-white text-4xl'>Chats</p>}
            <div className="p-4 border-b-2">
                {promptResponses.map((item, index) => (
                    <div key={index} className="qa-pair">
                        <div className="text-white">You: {item.question}</div>
                        <div className="text-white">Fiza's AI: {item.answer}</div>
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
            <div className="relative flex items-center">
                <form onSubmit={getResponseForGivenPrompt}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Type your query"
                        className="p-3 w-[30rem] rounded-md text-black rounded-e-full rounded-s-full"
                    />
                    {loading ? (
                        <button
                            className="absolute right-3 mt-2"
                        >
                            <i className="text-black text-3xl">
                                <AiOutlineLoading3Quarters />
                            </i>
                        </button>
                    ) : (
                        <button
                            onClick={getResponseForGivenPrompt}
                            className="absolute right-3 mt-2"
                            disabled={inputValue.length <= 0}
                        >
                            <i className={`text-3xl ${inputValue.length <= 0 ? 'text-gray-400' : 'text-black'}`}>
                                <BiSolidSend />
                            </i>
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AiChat;
