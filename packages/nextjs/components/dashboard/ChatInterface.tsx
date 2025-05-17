"use client";

import { useState } from "react";

export const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      role: "user",
      content: "Hi IdeaBot, I'm interested in content creation.",
    },
    {
      role: "bot",
      content:
        "Great! Analyzing your profile... (Skills: Writing, Video Editing. Recent activity: Blockchain basics).",
    },
    {
      role: "bot",
      content:
        "Based on current trends & your skills, here are some suggestions:",
      suggestions: [
        {
          id: 1,
          title: "Explain EIP-7702 in a 2-min video",
          demand: "High Demand",
        },
        {
          id: 2,
          title: "Write a blog post on ZK-Rollups",
          demand: "Medium Demand",
        },
      ],
    },
    {
      role: "user",
      content: "Can you generate a task about NFT gaming for beginners?",
    },
    {
      role: "bot",
      content: "Generating... Task: \"Intro to NFT Gaming Guide\"",
      generatedTask: {
        id: 3,
        title: "Create an NFT Gaming Guide for Beginners",
        description: "Explain basic concepts, popular games, and how to get started",
      },
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages([...messages, { role: "user", content: input }]);
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { 
          role: "bot", 
          content: "I'm analyzing your request. Let me suggest some relevant tasks based on your profile and the current market demand."
        }
      ]);
    }, 1000);
    
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-9rem)]">
      <h1 className="text-3xl font-bold mb-4">Chat with IdeaBot AI</h1>
      
      {/* Chat Messages Container */}
      <div className="flex-1 bg-base-200 rounded-xl p-6 overflow-y-auto mb-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat ${
                message.role === "user" ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-header">
                {message.role === "user" ? "You" : "IdeaBot"}
              </div>
              <div
                className={`chat-bubble ${
                  message.role === "user"
                    ? "chat-bubble-primary"
                    : "chat-bubble-secondary"
                }`}
              >
                {message.content}
                
                {/* Task Suggestions */}
                {message.suggestions && (
                  <div className="mt-2 space-y-2">
                    {message.suggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="bg-base-100 p-3 rounded-lg"
                      >
                        <div className="font-bold">{suggestion.title}</div>
                        <div className="text-sm">{suggestion.demand}</div>
                        <div className="flex gap-2 mt-2">
                          <button className="btn btn-primary btn-xs">
                            Accept Task
                          </button>
                          <button className="btn btn-ghost btn-xs">
                            More Info
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Generated Task */}
                {message.generatedTask && (
                  <div className="mt-2">
                    <div className="bg-base-100 p-3 rounded-lg">
                      <div className="font-bold">{message.generatedTask.title}</div>
                      <div className="text-sm">{message.generatedTask.description}</div>
                      <div className="mt-2">
                        <button className="btn btn-primary btn-xs">
                          Publish this Task to Marketplace
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Input Area */}
      <div className="flex gap-2 bg-base-200 p-4 rounded-xl">
        <input
          type="text"
          placeholder="Type your message..."
          className="input input-bordered flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="btn btn-primary" onClick={handleSend}>
          Send
        </button>
        <button className="btn btn-secondary">
          Send My Info
        </button>
      </div>
    </div>
  );
}; 