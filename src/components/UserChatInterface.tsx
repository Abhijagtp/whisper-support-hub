
import { useState, useEffect, useRef } from "react";
import { Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  text: string;
  sender: "user" | "agent" | "bot";
  timestamp: Date;
  avatar?: string;
}

interface UserInfo {
  name: string;
  phone: string;
  email: string;
  query: string;
}

const UserChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userInfo, setUserInfo] = useState<Partial<UserInfo>>({});
  const [isConnectedToAgent, setIsConnectedToAgent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const introFlow = [
    "Hi there! 👋 Welcome to our support chat. I'm here to help you get connected with the right person.",
    "First, could you please tell me your name?",
    "Thanks! Now, what's your contact number?",
    "Great! Could you share your email address?",
    "Perfect! Finally, could you briefly describe what you need help with today?",
    "Thank you for providing all the details! Let me connect you with one of our support agents. Please hold on for just a moment... 🔄"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Start intro flow
    addBotMessage(introFlow[0]);
    setTimeout(() => addBotMessage(introFlow[1]), 1500);
  }, []);

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text,
        sender: "bot",
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const addAgentMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text,
        sender: "agent",
        timestamp: new Date(),
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    }]);

    const message = inputMessage;
    setInputMessage("");

    // Handle intro flow
    if (currentStep < 5) {
      const newStep = currentStep + 1;
      
      switch (currentStep) {
        case 1:
          setUserInfo(prev => ({ ...prev, name: message }));
          break;
        case 2:
          setUserInfo(prev => ({ ...prev, phone: message }));
          break;
        case 3:
          setUserInfo(prev => ({ ...prev, email: message }));
          break;
        case 4:
          setUserInfo(prev => ({ ...prev, query: message }));
          break;
      }

      if (newStep < introFlow.length) {
        setTimeout(() => addBotMessage(introFlow[newStep]), 1000);
      }

      if (newStep === 5) {
        setTimeout(() => {
          setIsConnectedToAgent(true);
          addAgentMessage("Hi! I'm Sarah from the support team. I've reviewed your query and I'm here to help you. How can I assist you today?");
        }, 3000);
      }

      setCurrentStep(newStep);
    } else if (isConnectedToAgent) {
      // Handle regular chat with agent
      setTimeout(() => {
        const responses = [
          "I understand your concern. Let me look into this for you.",
          "That's a great question! Here's what I can tell you...",
          "I see what you mean. Let me help you with that.",
          "Thanks for the additional details. I'll get this sorted out for you."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addAgentMessage(randomResponse);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md h-[600px] bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 text-white p-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <User size={20} />
          </div>
          <div>
            <h2 className="font-semibold">Support Chat</h2>
            <p className="text-sm text-green-100">
              {isConnectedToAgent ? "Connected to Sarah" : "Getting you connected..."}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto h-[440px]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  message.sender === "user"
                    ? "bg-green-500 text-white rounded-br-md"
                    : message.sender === "agent"
                    ? "bg-white text-gray-800 rounded-bl-md shadow-lg"
                    : "bg-blue-500 text-white rounded-bl-md"
                }`}
              >
                {message.avatar && (
                  <div className="flex items-center space-x-2 mb-1">
                    <img 
                      src={message.avatar} 
                      alt="Agent" 
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-xs font-medium">Sarah</span>
                  </div>
                )}
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === "user" ? "text-green-100" : "text-gray-500"
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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
        <div className="p-4 bg-white/5 border-t border-white/10">
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/50 rounded-full"
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="bg-green-500 hover:bg-green-600 rounded-full"
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChatInterface;
