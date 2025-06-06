
export const mockChats = [
  {
    id: "1",
    user: {
      name: "Alice Johnson",
      email: "alice.johnson@email.com",
      phone: "+1 (555) 123-4567",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c24c?w=32&h=32&fit=crop&crop=face",
      query: "I'm having trouble accessing my account after the recent update"
    },
    messages: [
      {
        id: "1",
        text: "Hi, I'm having trouble logging into my account after the recent update. It keeps saying my password is incorrect.",
        sender: "user" as const,
        timestamp: "2:34 PM"
      },
      {
        id: "2", 
        text: "Hi Alice! I'm sorry to hear you're having trouble with your account. Let me help you with that. Can you tell me what email address you're using to log in?",
        sender: "admin" as const,
        timestamp: "2:35 PM"
      },
      {
        id: "3",
        text: "I'm using alice.johnson@email.com - the same one I've always used.",
        sender: "user" as const,
        timestamp: "2:36 PM"
      }
    ],
    status: "ongoing" as const,
    assignedLevel: "L1" as const,
    ticketNumber: "TK-001",
    lastMessage: "I'm using alice.johnson@email.com - the same one I've always used.",
    timestamp: "2:36 PM"
  },
  {
    id: "2",
    user: {
      name: "Bob Smith",
      email: "bob.smith@email.com", 
      phone: "+1 (555) 987-6543",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      query: "Payment failed but money was deducted from my account"
    },
    messages: [
      {
        id: "1",
        text: "My payment failed during checkout but the money was still deducted from my bank account. I need this resolved urgently.",
        sender: "user" as const,
        timestamp: "1:15 PM"
      }
    ],
    status: "new" as const,
    assignedLevel: "L2" as const,
    ticketNumber: "TK-002", 
    lastMessage: "My payment failed during checkout but the money was still deducted from my bank account.",
    timestamp: "1:15 PM"
  },
  {
    id: "3",
    user: {
      name: "Carol Davis",
      email: "carol.davis@email.com",
      phone: "+1 (555) 456-7890", 
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
      query: "Critical system integration failure affecting multiple services"
    },
    messages: [
      {
        id: "1",
        text: "We're experiencing a critical API integration failure that's affecting multiple services across our organization. This needs immediate attention.",
        sender: "user" as const,
        timestamp: "12:30 PM"
      },
      {
        id: "2",
        text: "I understand this is critical. I'm escalating this to our technical team immediately. You should receive a call within the next 15 minutes.",
        sender: "admin" as const,
        timestamp: "12:32 PM"
      }
    ],
    status: "escalated" as const,
    assignedLevel: "L3" as const,
    ticketNumber: "TK-003",
    lastMessage: "I understand this is critical. I'm escalating this to our technical team immediately.",
    timestamp: "12:32 PM"
  },
  {
    id: "4",
    user: {
      name: "David Wilson", 
      email: "david.wilson@email.com",
      phone: "+1 (555) 234-5678",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      query: "General question about subscription plans"
    },
    messages: [
      {
        id: "1",
        text: "What are the differences between your subscription plans?",
        sender: "user" as const,
        timestamp: "11:45 AM"
      },
      {
        id: "2",
        text: "Great question! Our Basic plan includes..., our Pro plan adds..., and our Enterprise plan offers full customization. Which features are most important to you?",
        sender: "admin" as const,
        timestamp: "11:47 AM"
      },
      {
        id: "3",
        text: "Thank you! That's exactly what I needed to know.",
        sender: "user" as const,
        timestamp: "11:50 AM"
      }
    ],
    status: "resolved" as const,
    assignedLevel: "L1" as const,
    ticketNumber: "TK-004",
    lastMessage: "Thank you! That's exactly what I needed to know.",
    timestamp: "11:50 AM"
  }
];
