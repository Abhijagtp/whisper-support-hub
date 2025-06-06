
import { useState, useEffect, useRef } from "react";
import { Send, User, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const UserChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [isConnectedToAgent, setIsConnectedToAgent] = useState(false);
  const messagesEndRef = useRef(null);

  const introFlow = [
    "Hello! 👋 Welcome to our support center. I'm here to connect you with the perfect support specialist.",
    "To get started, could you please share your name with me?",
    "Thank you! What's the best contact number to reach you?",
    "Perfect! Could you provide your email address?",
    "Excellent! Finally, could you briefly describe what brings you here today?",
    "Thank you for providing all the details! I'm connecting you with one of our expert support agents now. Please hold on just a moment... ✨"
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
    setTimeout(() => addBotMessage(introFlow[1]), 2000);
  }, []);

  const addBotMessage = (text) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text,
        sender: "bot",
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const addAgentMessage = (text) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text,
        sender: "agent",
        timestamp: new Date(),
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
      }]);
      setIsTyping(false);
    }, 2000);
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
        setTimeout(() => addBotMessage(introFlow[newStep]), 1500);
      }

      if (newStep === 5) {
        setTimeout(() => {
          setIsConnectedToAgent(true);
          addAgentMessage("Hi there! I'm Sarah from our support team. I've reviewed your inquiry and I'm ready to help you. How can I assist you today?");
        }, 4000);
      }

      setCurrentStep(newStep);
    } else if (isConnectedToAgent) {
      // Handle regular chat with agent
      setTimeout(() => {
        const responses = [
          "I completely understand your concern. Let me look into this right away.",
          "That's an excellent question! Here's what I can tell you about that...",
          "I see exactly what you mean. Let me help you resolve this.",
          "Thank you for the additional information. I'll get this sorted out for you promptly."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addAgentMessage(randomResponse);
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg h-[700px] bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-6 flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            {isConnectedToAgent ? (
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                alt="Support Agent"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <MessageCircle size={24} />
            )}
          </div>
          <div>
            <h2 className="font-semibold text-lg">Support Center</h2>
            <p className="text-sm text-emerald-100">
              {isConnectedToAgent ? "Connected with Sarah" : "Getting you connected..."}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto h-[500px] bg-gray-50/30">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="flex items-end space-x-2 max-w-xs">
                {message.sender !== "user" && message.avatar && (
                  <img 
                    src={message.avatar} 
                    alt="Agent" 
                    className="w-8 h-8 rounded-full mb-1"
                  />
                )}
                <div
                  className={`px-4 py-3 rounded-2xl shadow-sm ${
                    message.sender === "user"
                      ? "bg-emerald-500 text-white rounded-br-md"
                      : message.sender === "agent"
                      ? "bg-white text-gray-800 rounded-bl-md border border-gray-200"
                      : "bg-blue-500 text-white rounded-bl-md"
                  }`}
                >
                  {message.sender === "agent" && (
                    <div className="text-xs font-medium text-emerald-600 mb-1">Sarah</div>
                  )}
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 ${
                    message.sender === "user" ? "text-emerald-100" : "text-gray-500"
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-end space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
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
        <div className="p-6 bg-white border-t border-gray-200">
          <div className="flex space-x-3">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 rounded-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="bg-emerald-500 hover:bg-emerald-600 rounded-full w-12 h-12 shadow-lg"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChatInterface;
