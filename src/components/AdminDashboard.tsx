
import { useState } from "react";
import { Search, Filter, MoreVertical, ArrowUp, MessageCircle, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ChatWindow from "@/components/ChatWindow";
import { mockChats } from "@/data/mockData";

type AdminLevel = "L1" | "L2" | "L3";
type ChatStatus = "new" | "ongoing" | "escalated" | "resolved";

const AdminDashboard = () => {
  const [selectedLevel, setSelectedLevel] = useState<AdminLevel>("L1");
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<ChatStatus | "all">("all");

  const levelColors = {
    L1: "from-green-500 to-green-600",
    L2: "from-blue-500 to-blue-600",
    L3: "from-red-500 to-red-600"
  };

  const levelBorderColors = {
    L1: "border-green-500/50",
    L2: "border-blue-500/50",
    L3: "border-red-500/50"
  };

  const getStatusIcon = (status: ChatStatus) => {
    switch (status) {
      case "new": return <MessageCircle size={16} className="text-blue-400" />;
      case "ongoing": return <Clock size={16} className="text-yellow-400" />;
      case "escalated": return <ArrowUp size={16} className="text-orange-400" />;
      case "resolved": return <CheckCircle size={16} className="text-green-400" />;
    }
  };

  const getStatusColor = (status: ChatStatus) => {
    switch (status) {
      case "new": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "ongoing": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "escalated": return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case "resolved": return "bg-green-500/20 text-green-300 border-green-500/30";
    }
  };

  const filteredChats = mockChats.filter(chat => {
    const levelMatch = chat.assignedLevel === selectedLevel;
    const statusMatch = statusFilter === "all" || chat.status === statusFilter;
    return levelMatch && statusMatch;
  });

  const selectedChat = mockChats.find(chat => chat.id === selectedChatId);

  return (
    <div className="h-screen flex">
      {/* Left Panel - Chat Queue */}
      <div className="w-80 bg-white/5 backdrop-blur-xl border-r border-white/10">
        {/* Level Selector */}
        <div className="p-4 border-b border-white/10">
          <div className="flex space-x-1 bg-white/5 rounded-lg p-1">
            {(["L1", "L2", "L3"] as AdminLevel[]).map((level) => (
              <Button
                key={level}
                variant={selectedLevel === level ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedLevel(level)}
                className={`flex-1 ${
                  selectedLevel === level
                    ? `bg-gradient-to-r ${levelColors[level]} text-white`
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="p-4 border-b border-white/10">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={16} />
            <Input 
              placeholder="Search chats..." 
              className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50"
            />
          </div>
          <div className="flex space-x-1">
            {(["all", "new", "ongoing", "escalated", "resolved"] as const).map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "ghost"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className={`text-xs ${
                  statusFilter === status
                    ? "bg-white/20 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className={`p-4 border-b border-white/5 cursor-pointer transition-all hover:bg-white/5 ${
                selectedChatId === chat.id ? `bg-white/10 ${levelBorderColors[selectedLevel]} border-l-4` : ""
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <img 
                    src={chat.user.avatar} 
                    alt={chat.user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <h3 className="text-white font-medium text-sm">{chat.user.name}</h3>
                    <p className="text-white/60 text-xs">{chat.user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(chat.status)}
                  <span className="text-xs text-white/60">{chat.timestamp}</span>
                </div>
              </div>
              <p className="text-white/70 text-sm mb-2 line-clamp-2">{chat.lastMessage}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={`text-xs ${getStatusColor(chat.status)}`}>
                  {chat.status}
                </Badge>
                <span className="text-xs text-white/40">#{chat.ticketNumber}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Center Panel - Chat Window */}
      <div className="flex-1">
        {selectedChat ? (
          <ChatWindow chat={selectedChat} adminLevel={selectedLevel} />
        ) : (
          <div className="h-full flex items-center justify-center bg-white/5">
            <div className="text-center">
              <MessageCircle size={48} className="mx-auto mb-4 text-white/40" />
              <h3 className="text-white text-lg font-medium mb-2">Select a chat to start</h3>
              <p className="text-white/60">Choose a conversation from the {selectedLevel} queue</p>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel - Chat Info */}
      {selectedChat && (
        <div className="w-80 bg-white/5 backdrop-blur-xl border-l border-white/10 p-4">
          <div className="space-y-6">
            {/* User Info */}
            <div>
              <h3 className="text-white font-medium mb-3">User Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <img 
                    src={selectedChat.user.avatar} 
                    alt={selectedChat.user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="text-white font-medium">{selectedChat.user.name}</h4>
                    <p className="text-white/60 text-sm">{selectedChat.user.email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-white/60 text-sm">Phone:</span>
                    <p className="text-white">{selectedChat.user.phone}</p>
                  </div>
                  <div>
                    <span className="text-white/60 text-sm">Query:</span>
                    <p className="text-white text-sm">{selectedChat.user.query}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Status */}
            <div>
              <h3 className="text-white font-medium mb-3">Chat Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/60 text-sm">Status:</span>
                  <Badge variant="outline" className={getStatusColor(selectedChat.status)}>
                    {selectedChat.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60 text-sm">Level:</span>
                  <Badge variant="outline" className={`${getStatusColor(selectedChat.status)} ${levelColors[selectedChat.assignedLevel]}`}>
                    {selectedChat.assignedLevel}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60 text-sm">Ticket:</span>
                  <span className="text-white text-sm">#{selectedChat.ticketNumber}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                Escalate to {selectedLevel === "L1" ? "L2" : "L3"}
              </Button>
              <Button variant="outline" className="w-full border-green-500/50 text-green-400 hover:bg-green-500/10">
                Mark as Resolved
              </Button>
              <Button variant="outline" className="w-full border-white/20 text-white/70 hover:bg-white/10">
                Add Internal Note
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
