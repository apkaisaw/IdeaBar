"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Address } from "~~/components/scaffold-eth";

export const Chat = () => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedContact, setSelectedContact] = useState("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

  // Mock data - in real app would come from contract
  const contacts = [
    {
      address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      name: "Alex Thompson",
      lastMessage: "Thanks for completing the task!",
      unread: 2,
      avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Alex",
      status: "online",
    },
    {
      address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      name: "Maria Chen",
      lastMessage: "Can you provide more details?",
      unread: 0,
      avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Maria",
      status: "offline",
    },
    {
      address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
      name: "Sam Wilson",
      lastMessage: "I'll review your proposal",
      unread: 0,
      avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Sam",
      status: "away",
    },
    {
      address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
      name: "Elena Kowalski",
      lastMessage: "The deadline has been extended",
      unread: 1,
      avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Elena",
      status: "online",
    },
  ];

  // Mock conversation data
  const conversations = useMemo<Record<string, Array<{ sender: string; text: string; timestamp: string }>>>(
    () => ({
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266": [
        {
          sender: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          text: "Hi, I saw your AI task solution. Can you provide some details on how you implemented it?",
          timestamp: "10:32 AM",
        },
        {
          sender: "me",
          text: "Hey Alex! Sure, I used a transformer-based approach with a custom training dataset.",
          timestamp: "10:35 AM",
        },
        {
          sender: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          text: "That&apos;s interesting. How did you handle the data preprocessing?",
          timestamp: "10:38 AM",
        },
        {
          sender: "me",
          text: "I created a pipeline that first cleans the input, removes bias, and then tokenizes everything with BytePair encoding.",
          timestamp: "10:40 AM",
        },
        {
          sender: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          text: "Great job! I&apos;d like to discuss potential collaboration on a similar project.",
          timestamp: "10:42 AM",
        },
        {
          sender: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          text: "Thanks for completing the task!",
          timestamp: "10:45 AM",
        },
      ],
      "0x70997970C51812dc3A010C7d01b50e0d17dc79C8": [
        {
          sender: "me",
          text: "Hi Maria, I&apos;ve completed the initial research for the DeFi project.",
          timestamp: "Yesterday",
        },
        {
          sender: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
          text: "Thanks for the update. Can you provide more details?",
          timestamp: "Yesterday",
        },
      ],
      "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC": [
        { sender: "me", text: "Hello Sam, here&apos;s my proposal for the smart contract audit.", timestamp: "Monday" },
        {
          sender: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
          text: "I&apos;ll review your proposal",
          timestamp: "Monday",
        },
      ],
      "0x90F79bf6EB2c4f870365E785982E1f101E93b906": [
        {
          sender: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
          text: "Just wanted to let you know that the ZK-proof task deadline has been extended by a week.",
          timestamp: "2 days ago",
        },
        { sender: "me", text: "That&apos;s great news, thanks for letting me know!", timestamp: "2 days ago" },
        {
          sender: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
          text: "The deadline has been extended",
          timestamp: "Yesterday",
        },
      ],
    }),
    [],
  );

  // Mock contract write
  // const { writeContractAsync } = useScaffoldWriteContract({
  //   contractName: "ChatContract",
  // });

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      // In a real app, you'd call the actual contract
      // await writeContractAsync({
      //   functionName: "sendMessage",
      //   args: [selectedContact, message],
      // });

      // For our mock, we'll just update the UI
      const newMessage = {
        sender: "me",
        text: message,
        timestamp: "Just now",
      };

      conversations[selectedContact] = [...conversations[selectedContact], newMessage];

      setMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedContact, conversations]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-base-300/10 to-base-300/5">
      {/* 深色背景覆盖 */}
      <div className="fixed inset-0 bg-black/80 -z-10"></div>

      {/* SVG Background with patterns */}
      <div className="fixed top-0 left-0 w-full h-full -z-5 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M0,0 L40,0 L40,40 L0,40 L0,0 Z M39,1 L1,1 L1,39 L39,39 L39,1 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
            <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1.5" fill="currentColor" />
            </pattern>
            <mask id="gridMask">
              <rect width="100%" height="100%" fill="url(#grid)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
          <rect width="100%" height="100%" fill="currentColor" mask="url(#gridMask)" opacity="0.2" />
        </svg>
      </div>

      {/* 装饰光效 */}
      <div className="fixed top-0 left-[10%] w-[35%] h-[40vh] bg-blue-600/20 blur-[120px] rounded-full -z-1"></div>
      <div className="fixed top-[20%] right-[10%] w-[25%] h-[30vh] bg-indigo-600/20 blur-[100px] rounded-full -z-1"></div>
      <div className="fixed bottom-[10%] left-[20%] w-[30%] h-[30vh] bg-purple-600/20 blur-[100px] rounded-full -z-1"></div>

      <div className="w-full h-screen flex flex-col pt-4 pb-4 px-4 sm:px-6 relative max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300 font-extrabold">
              IdeaBar Messages
            </span>
          </h1>
        </div>

        <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
          {/* Contact List */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-indigo-900/10 rounded-2xl"></div>
              <div className="absolute inset-0 border border-indigo-500/20 rounded-2xl"></div>

              <div className="relative p-4 z-10 backdrop-blur-sm h-full flex flex-col">
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search contacts..."
                      className="w-full py-2 px-4 bg-gray-900/40 border border-indigo-500/20 rounded-lg text-gray-200 focus:outline-none focus:border-indigo-400/40 placeholder-gray-500"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 absolute right-3 top-2.5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-hide pr-1" style={{ scrollbarWidth: "none" }}>
                  <div className="space-y-2">
                    {contacts.map(contact => (
                      <div
                        key={contact.address}
                        className={`p-3 rounded-xl cursor-pointer transition-all duration-200 relative group hover:scale-[1.02] ${
                          selectedContact === contact.address
                            ? "bg-indigo-600/30 border border-indigo-400/30"
                            : "bg-gray-800/40 border border-gray-700/40 hover:bg-gray-700/40"
                        }`}
                        onClick={() => setSelectedContact(contact.address)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <Image
                              src={contact.avatar}
                              alt={contact.name}
                              width={40}
                              height={40}
                              className="w-10 h-10 rounded-full bg-gray-700"
                            />
                            <div
                              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${
                                contact.status === "online"
                                  ? "bg-green-500"
                                  : contact.status === "away"
                                    ? "bg-yellow-500"
                                    : "bg-gray-500"
                              }`}
                            ></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium text-white truncate">{contact.name}</h3>
                              <span className="text-xs text-gray-400 whitespace-nowrap">
                                {/* Mock time */}
                                {contact.address === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
                                  ? "10:45 AM"
                                  : contact.address === "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
                                    ? "Yesterday"
                                    : contact.address === "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
                                      ? "Monday"
                                      : "2d ago"}
                              </span>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                              <p className="text-sm text-gray-400 truncate">{contact.lastMessage}</p>
                              {contact.unread > 0 && (
                                <span className="flex items-center justify-center min-w-[20px] h-5 rounded-full bg-indigo-600 text-white text-xs font-medium">
                                  {contact.unread}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            <div className="relative h-full flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-indigo-900/10 rounded-2xl"></div>
              <div className="absolute inset-0 border border-indigo-500/20 rounded-2xl"></div>

              {/* Chat Header */}
              <div className="relative z-10 p-4 border-b border-indigo-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Image
                    src={contacts.find(c => c.address === selectedContact)?.avatar || ""}
                    alt={contacts.find(c => c.address === selectedContact)?.name || ""}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full bg-gray-700"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-white">
                      {contacts.find(c => c.address === selectedContact)?.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          contacts.find(c => c.address === selectedContact)?.status === "online"
                            ? "bg-green-500"
                            : contacts.find(c => c.address === selectedContact)?.status === "away"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                        }`}
                      ></div>
                      <span className="text-xs text-gray-400">
                        {contacts.find(c => c.address === selectedContact)?.status === "online"
                          ? "Online"
                          : contacts.find(c => c.address === selectedContact)?.status === "away"
                            ? "Away"
                            : "Offline"}
                      </span>
                      <span className="text-gray-500 mx-1">•</span>
                      <span className="text-xs text-gray-400">
                        <Address address={selectedContact} size="xs" format="short" />
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full hover:bg-gray-700/50 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-700/50 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-700/50 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div
                className="relative z-10 flex-1 p-4 overflow-y-auto scrollbar-hide"
                style={{ scrollbarWidth: "none" }}
              >
                <div className="space-y-3">
                  {conversations[selectedContact]?.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[75%] relative group`}>
                        {msg.sender !== "me" &&
                          idx > 0 &&
                          conversations[selectedContact][idx - 1].sender !== msg.sender && (
                            <div className="absolute -left-12 top-1">
                              <Image
                                src={contacts.find(c => c.address === selectedContact)?.avatar || ""}
                                alt="avatar"
                                width={32}
                                height={32}
                                className="w-8 h-8 rounded-full bg-gray-700"
                              />
                            </div>
                          )}

                        <div
                          className={`p-3 rounded-2xl ${
                            msg.sender === "me"
                              ? "bg-indigo-600/40 border border-indigo-400/30 text-white"
                              : "bg-gray-800/60 border border-gray-700/40 text-gray-200"
                          }`}
                        >
                          <p>{msg.text}</p>
                          <div
                            className={`text-xs mt-1 ${
                              msg.sender === "me" ? "text-indigo-200/70" : "text-gray-400"
                            } flex justify-between items-center`}
                          >
                            <span>{msg.timestamp}</span>
                            {msg.sender === "me" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-indigo-200/70 ml-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div className="relative z-10 p-4 border-t border-indigo-500/20 backdrop-blur-sm">
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex gap-2"
                >
                  <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-gray-200 rounded-full hover:bg-gray-700/50 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                  </button>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="w-full py-2 px-4 bg-gray-900/40 border border-indigo-500/20 rounded-lg text-gray-200 focus:outline-none focus:border-indigo-400/40 placeholder-gray-500"
                    />
                    <button type="button" className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="p-2 bg-indigo-600/60 hover:bg-indigo-500/70 text-white rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group/btn"
                    disabled={!message.trim()}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/40 to-blue-600/40 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
