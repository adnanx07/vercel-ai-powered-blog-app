"use client";

import { useEffect, useRef, useState } from "react";
import { streamText } from "ai";
import { marked } from "marked";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import useFetchRemoteData from "@/hooks/useFetchRemoteData";
import { ENV_CONFIG } from "@/constants";

const Chat = ({ params }) => {
  const { blog: blogId } = params;
  const { getBlogById } = useFetchRemoteData();

  const google = createGoogleGenerativeAI({
    apiKey: ENV_CONFIG.APP.GOOGLE_GENERATIVE_API_KEY,
  });

  const chatContainerRef = useRef(null);

  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (promptText, isIntialRequest=false) => {
    if (!promptText.trim()) return;
    
    const userMessage = { sender: 'user', text: isIntialRequest ? 'Summarize this blog' : promptText };
    setChatHistory((prev) => [...prev, userMessage]);

    let inputPrompt = isIntialRequest ? `Summarize this blog ${promptText}` : promptText

    const result = await streamText({
      model: google('models/gemini-pro', {
        safetySettings: [
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH'},
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH'},
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH'},
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH'},
        ]
      }),
      prompt: inputPrompt,
    });

    let aiResponse = '';
    for await (const textPart of result.textStream) {
      aiResponse += textPart;
    }

    const aiMessage = { sender: 'ai', text: aiResponse };
    setChatHistory((prev) => [...prev, aiMessage]);
  };

  const summarizeBlog = async () => {
    const { data } = await getBlogById(blogId);
    const { body } = data;
    handleSubmit(body, true);
  };

  useEffect(() => {
    // Scroll to bottom of the chat container when chat history changes
    chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  useEffect(() => {
    summarizeBlog();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-4">
        <div className="h-96 overflow-y-auto mb-4 p-2 border rounded">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`${
                  message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                } rounded-lg p-2 m-2 max-w-xs`}
              >
                {/* NOTE: using markdown viewer to facilitate format */}
                <div dangerouslySetInnerHTML={{ __html: marked(message.text) }} />
              </div>
            </div>
          ))}
          {/* NOTE: ref is used to keep the latest result in view, so user don't need to scroll after new result */}
        <div ref={chatContainerRef} />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(prompt);
            setPrompt('');
          }}
          className="flex"
        >
          <input
            type="text"
            value={prompt}
            onChange={handleInputChange}
            className="flex-1 p-2 border rounded-l-lg"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-r-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
