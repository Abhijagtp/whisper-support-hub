
import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Chat {
  id: string;
  user: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
    query: string;
  };
  messages: Array<{
    id: string;
    text: string;
    sender: "user" | "admin";
    timestamp: string;
  }>;
  status: "new" | "ongoing" | "escalated" | "resolved";
  assignedLevel: "L1" | "L2" | "L3";
  ticketNumber: string;
  lastMessage: string;
  timestamp: string;
}

interface ChatWindowProps {
  chat: Chat;
  adminLevel: "L1" | "L2" | "L3";
}

const ChatWindow = ({ chat, adminLevel }: ChatWindowProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Here you would typically send the message to your backend
    console.log("Sending message:", newMessage);
    setNewMessage("");
    
    // Simulate user response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // This would be handled by your real-time messaging system
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const levelColors = {
    L1: "border-green-500/50",
    L2: "border-blue-500/50", 
    L3: "border-red-500/50"
  };

  return (
    <div className={`h-full flex flex-col border-l-4 ${levelColors[adminLevel]}`}>
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={chat.user.avatar} 
              alt={chat.user.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="text-white font-medium">{chat.user.name}</h2>
              <p className="text-white/60 text-sm">#{chat.ticketNumber} • {chat.status}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              adminLevel === "L1" ? "bg-green-500/20 text-green-300" :
              adminLevel === "L2" ? "bg-blue-500/20 text-blue-300" :
              "bg-red-500/20 text-red-300"
            }`}>
              {adminLevel}
            </div>
            <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/10">
              <MoreVertical size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "admin" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.sender === "admin"
                  ? `bg-gradient-to-r ${
                      adminLevel === "L1" ? "from-green-500 to-green-600" :
                      adminLevel === "L2" ? "from-blue-500 to-blue-600" :
                      "from-red-500 to-red-600"
                    } text-white rounded-br-md`
                  : "bg-white text-gray-800 rounded-bl-md shadow-lg"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === "admin" ? "text-white/80" : "text-gray-500"
              }`}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 rounded-2xl rounded-bl-md px-4 py-2 shadow-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white/5 border-t border-white/10 p-4">
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            <Paperclip size={16} />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your response..."
            className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/50"
          />
          <Button
            onClick={handleSendMessage}
            className={`${
              adminLevel === "L1" ? "bg-green-500 hover:bg-green-600" :
              adminLevel === "L2" ? "bg-blue-500 hover:bg-blue-600" :
              "bg-red-500 hover:bg-red-600"
            } text-white`}
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
