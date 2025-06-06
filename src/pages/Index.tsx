
import { useState } from "react";
import UserChatInterface from "@/components/UserChatInterface";
import AdminDashboard from "@/components/AdminDashboard";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [viewMode, setViewMode] = useState<"user" | "admin">("user");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-white/10 backdrop-blur-lg rounded-full p-1 border border-white/20">
          <Button
            variant={viewMode === "user" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("user")}
            className={`rounded-full px-4 ${
              viewMode === "user" 
                ? "bg-green-500 hover:bg-green-600 text-white" 
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            User View
          </Button>
          <Button
            variant={viewMode === "admin" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("admin")}
            className={`rounded-full px-4 ${
              viewMode === "admin" 
                ? "bg-blue-500 hover:bg-blue-600 text-white" 
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            Admin View
          </Button>
        </div>
      </div>

      {/* Content */}
      {viewMode === "user" ? <UserChatInterface /> : <AdminDashboard />}
    </div>
  );
};

export default Index;
