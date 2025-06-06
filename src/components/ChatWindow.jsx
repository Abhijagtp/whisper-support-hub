
import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, MoreVertical, Phone, Video } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const ChatWindow = ({ chat, adminLevel }) => {
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    console.log("Sending message:", newMessage);
    setNewMessage("");
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const levelColors = {
    L1: "from-emerald-500 to-emerald-600",
    L2: "from-blue-500 to-blue-600", 
    L3: "from-red-500 to-red-600"
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src={chat.user.avatar} 
              alt={chat.user.name}
              className="w-12 h-12 rounded-full border-2 border-gray-200"
            />
            <div>
              <h2 className="text-gray-900 font-semibold text-lg">{chat.user.name}</h2>
              <p className="text-gray-500 text-sm">#{chat.ticketNumber} • {chat.status}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${levelColors[adminLevel]} text-white`}>
              {adminLevel} Support
            </div>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
              <Phone size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
              <Video size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
              <MoreVertical size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {chat.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "admin" ? "justify-end" : "justify-start"}`}
          >
            <div className="flex items-end space-x-2 max-w-xs lg:max-w-md">
              {message.sender === "user" && (
                <img 
                  src={chat.user.avatar} 
                  alt={chat.user.name}
                  className="w-8 h-8 rounded-full mb-1"
                />
              )}
              <div
                className={`px-4 py-3 rounded-2xl shadow-sm ${
                  message.sender === "admin"
                    ? `bg-gradient-to-r ${levelColors[adminLevel]} text-white rounded-br-md`
                    : "bg-white text-gray-800 rounded-bl-md border border-gray-200"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === "admin" ? "text-white/80" : "text-gray-500"
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-end space-x-2">
              <img 
                src={chat.user.avatar} 
                alt={chat.user.name}
                className="w-8 h-8 rounded-full mb-1"
              />
              <div className="bg-white text-gray-800 rounded-2xl rounded-bl-md px-4 py-3 border border-gray-200 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-6">
        <div className="flex space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
          >
            <Paperclip size={18} />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your response..."
            className="flex-1 rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          <Button
            onClick={handleSendMessage}
            className={`bg-gradient-to-r ${levelColors[adminLevel]} text-white rounded-full w-12 h-12 shadow-lg hover:shadow-xl transition-shadow`}
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
