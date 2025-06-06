
import { useState } from "react";
import { Search, Filter, MoreVertical, ArrowUp, MessageCircle, Clock, CheckCircle, Users } from "lucide-react";
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
    L1: "from-emerald-500 to-emerald-600",
    L2: "from-blue-500 to-blue-600",
    L3: "from-red-500 to-red-600"
  };

  const levelBorderColors = {
    L1: "border-l-emerald-500",
    L2: "border-l-blue-500",
    L3: "border-l-red-500"
  };

  const getStatusIcon = (status: ChatStatus) => {
    switch (status) {
      case "new": return <MessageCircle size={16} className="text-blue-500" />;
      case "ongoing": return <Clock size={16} className="text-amber-500" />;
      case "escalated": return <ArrowUp size={16} className="text-orange-500" />;
      case "resolved": return <CheckCircle size={16} className="text-emerald-500" />;
    }
  };

  const getStatusColor = (status: ChatStatus) => {
    switch (status) {
      case "new": return "bg-blue-50 text-blue-700 border-blue-200";
      case "ongoing": return "bg-amber-50 text-amber-700 border-amber-200";
      case "escalated": return "bg-orange-50 text-orange-700 border-orange-200";
      case "resolved": return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
  };

  const filteredChats = mockChats.filter(chat => {
    const levelMatch = chat.assignedLevel === selectedLevel;
    const statusMatch = statusFilter === "all" || chat.status === statusFilter;
    return levelMatch && statusMatch;
  });

  const selectedChat = mockChats.find(chat => chat.id === selectedChatId);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Panel - Chat Queue */}
      <div className="w-80 bg-white border-r border-gray-200 shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="text-gray-600" size={24} />
            <h1 className="text-xl font-semibold text-gray-900">Support Dashboard</h1>
          </div>
          
          {/* Level Selector */}
          <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
            {(["L1", "L2", "L3"] as AdminLevel[]).map((level) => (
              <Button
                key={level}
                variant={selectedLevel === level ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedLevel(level)}
                className={`flex-1 rounded-lg font-medium transition-all ${
                  selectedLevel === level
                    ? `bg-gradient-to-r ${levelColors[level]} text-white shadow-md`
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }`}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input 
              placeholder="Search conversations..." 
              className="pl-10 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-1 overflow-x-auto">
            {(["all", "new", "ongoing", "escalated", "resolved"] as const).map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "ghost"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className={`text-xs whitespace-nowrap rounded-lg ${
                  statusFilter === status
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
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
              className={`p-4 border-b border-gray-100 cursor-pointer transition-all hover:bg-gray-50 ${
                selectedChatId === chat.id ? `bg-blue-50 ${levelBorderColors[selectedLevel]} border-l-4` : ""
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <img 
                    src={chat.user.avatar} 
                    alt={chat.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="text-gray-900 font-medium text-sm">{chat.user.name}</h3>
                    <p className="text-gray-500 text-xs">{chat.user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(chat.status)}
                  <span className="text-xs text-gray-500">{chat.timestamp}</span>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-3 line-clamp-2">{chat.lastMessage}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={`text-xs border ${getStatusColor(chat.status)}`}>
                  {chat.status}
                </Badge>
                <span className="text-xs text-gray-400">#{chat.ticketNumber}</span>
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
          <div className="h-full flex items-center justify-center bg-white">
            <div className="text-center">
              <MessageCircle size={64} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-gray-900 text-xl font-medium mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a chat from the {selectedLevel} queue to begin</p>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel - Chat Info */}
      {selectedChat && (
        <div className="w-80 bg-white border-l border-gray-200 shadow-sm p-6">
          <div className="space-y-6">
            {/* User Info */}
            <div>
              <h3 className="text-gray-900 font-semibold mb-4 text-lg">Customer Details</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img 
                    src={selectedChat.user.avatar} 
                    alt={selectedChat.user.name}
                    className="w-14 h-14 rounded-full border-2 border-gray-200"
                  />
                  <div>
                    <h4 className="text-gray-900 font-medium">{selectedChat.user.name}</h4>
                    <p className="text-gray-500 text-sm">{selectedChat.user.email}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-gray-600 text-sm font-medium">Phone Number</span>
                    <p className="text-gray-900">{selectedChat.user.phone}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-gray-600 text-sm font-medium">Initial Query</span>
                    <p className="text-gray-900 text-sm">{selectedChat.user.query}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Status */}
            <div>
              <h3 className="text-gray-900 font-semibold mb-4 text-lg">Support Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Status</span>
                  <Badge variant="outline" className={`border ${getStatusColor(selectedChat.status)}`}>
                    {selectedChat.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Priority Level</span>
                  <Badge className={`bg-gradient-to-r ${levelColors[selectedChat.assignedLevel]} text-white`}>
                    {selectedChat.assignedLevel}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Ticket ID</span>
                  <span className="text-gray-900 text-sm font-mono">#{selectedChat.ticketNumber}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <h3 className="text-gray-900 font-semibold mb-4 text-lg">Quick Actions</h3>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg">
                Escalate to {selectedLevel === "L1" ? "L2" : "L3"}
              </Button>
              <Button variant="outline" className="w-full border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                Mark as Resolved
              </Button>
              <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg">
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
