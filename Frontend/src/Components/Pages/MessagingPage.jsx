import React, { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import { createSocketConnection } from "../../Utils/socket";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Sidebar } from "../Sidebar";
import axios from "axios";
import CrossButton from "../Button/CrossButton";
import { baseUrl } from "../../Utils/base";

const MessagingPage = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  console.log(user);
  const fromUserId = user?._id;
  const toUserId = useParams().touserid;
  const userName = useParams().username;
  console.log(toUserId);
  // Mock users data
  const currentUser = {
    avatar:
      "https://i.pinimg.com/736x/92/44/49/9244499af3cbdc9ce5a559ddab217505.jpg",
  };

  const otherUser = {
    avatar:
      "https://i.pinimg.com/736x/92/44/49/9244499af3cbdc9ce5a559ddab217505.jpg",
  };

  // Initial mock messages
  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessage = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/message/` + toUserId,
        {
          withCredentials: true,
        }
      );

      console.log("------------------------", res.data.message);
      let current = res.data.message;
      setMessages((prev) => [...prev, ...current]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if(messages.length === 0){
    fetchMessage();
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
    console.log("this will be a ", messages);
  }, [messages]);

  useEffect(() => {
    const socket = createSocketConnection();
    socket.emit("joinChat", { fromUserId, toUserId });

    socket.on("messageReceived", ({ firstName, text }) => {
      console.log(firstName, "-", text);

      if (firstName !== user.firstName) {
        const responseMessage = {
          id: messages.length + 2,
          senderId: otherUser.id,
          text: text,
          timestamp: new Date(),
          senderName: firstName,
        };
        setMessages((prev) => [...prev, responseMessage]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      fromUserId,
      toUserId,
      text: newMessage,
    });
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp); // Ensure timestamp is a Date object
    const diff = now - time;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const formatTimeResent = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  // Send message function
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    // "senderId": {
    //             "_id": "68b8783f3a3618f876ca342a",
    //             "firstName": "Nariyal",
    //             "lastName": "Verma"
    //         },
    //         "text": "hey, hello",
    //         "_id": "68cc1d56ceb662002a98400c",
    //         "createdAt": "2025-09-18T14:55:18.316Z",
    //         "updatedAt": "2025-09-18T14:55:18.316Z"

    const message = {
      senderId: {
        _id: fromUserId,
        firstName: user.firstName,
        lastName: user.last,
      },
      text: newMessage.trim(),
      timestamp: new Date(),
    };

    sendMessage();

    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate other user typing and responding
    // setTimeout(() => {
    //   setIsTyping(true)
    // }, 1000)

    // setTimeout(() => {
    //   const responses = [
    //     "That sounds interesting!",
    //     "Thanks for letting me know!",
    //     "Great work! 👍",
    //     "I see what you mean.",
    //     "Let's discuss this more later.",
    //     "Awesome! Keep me posted."
    //   ]

    //   const randomResponse = responses[Math.floor(Math.random() * responses.length)]

    //   const responseMessage = {
    //     id: messages.length + 2,
    //     senderId: otherUser.id,
    //     text: randomResponse,
    //     timestamp: new Date(),
    //     senderName: otherUser.name
    //   }

    //   setMessages(prev => [...prev, responseMessage])
    //   setIsTyping(false)
    // }, 3000)
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <Sidebar currentPath="/connections">
      <div className="min-h-full bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4 ">
          <img
            src={otherUser.avatar}
            alt={userName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">
              {userName }
            </h2>
            {/* <p className="text-sm text-green-500">Active now</p> */}
          </div>
          <CrossButton onClick={() => navigate(-1)} />

          <div className="flex gap-2"></div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((message, inx) => (
            <div
              key={inx}
              className={`flex gap-3 ${
                message.senderId?._id === fromUserId
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {message.senderId?._id !== fromUserId && (
                <img
                  src={otherUser.avatar}
                  alt={message.senderId?.firstName}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
              )}

              <h1 className="text-xs text-zinc-400">
                {message?.senderId?.firstName}
              </h1>

              <div
                className={`max-w-xs lg:max-w-md ${
                  message.senderId === currentUser.id ? "order-1" : ""
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    message.senderId._id === fromUserId
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-white border border-gray-200 text-gray-900 rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
                <p
                  className={`text-xs text-gray-500 mt-1 ${
                    message.senderId === currentUser.id
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  {message.updatedAt
                    ? formatTime(message.updatedAt)
                    : formatTimeResent(message.timestamp)}
                </p>
              </div>

              {message.senderId?._id === fromUserId && (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0 order-2"
                />
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <img
                src={otherUser.avatar}
                alt={otherUser.name}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="max-w-xs lg:max-w-md">
                <div className="px-4 py-2 rounded-2xl bg-white border border-gray-200 rounded-bl-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">typing...</p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <form onSubmit={handleSendMessage} className="flex gap-4 items-end">
            <div className="flex-1">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                rows={1}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32"
                style={{ minHeight: "48px" }}
              />
            </div>
            <button
              // onClick={() => }
              type="submit"
              disabled={newMessage.trim() === ""}
              className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </Sidebar>
  );
};

export default MessagingPage;
