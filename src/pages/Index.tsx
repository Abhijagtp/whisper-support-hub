
import { useState } from "react";
import UserChatInterface from "@/components/UserChatInterface";
import AdminDashboard from "@/components/AdminDashboard";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [viewMode, setViewMode] = useState<"user" | "admin">("user");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Mode Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 border border-gray-200/50 shadow-lg">
          <Button
            variant={viewMode === "user" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("user")}
            className={`rounded-xl px-6 py-2 font-medium transition-all duration-200 ${
              viewMode === "user" 
                ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md" 
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            User View
          </Button>
          <Button
            variant={viewMode === "admin" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("admin")}
            className={`rounded-xl px-6 py-2 font-medium transition-all duration-200 ${
              viewMode === "admin" 
                ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md" 
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
