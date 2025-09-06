import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Input from "@/components/reuseit/Input";
import Avatar from "@/components/reuseit/Avatar";
import { Send, Heart } from "lucide-react";
import { axiosInstance } from "@/utils/axiosInstance";

export default function WellnessChatbot() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      content:
        "Hello! I'm here to support you on your emotional wellness journey. How are you feeling today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const res = await axiosInstance.post("/chat/send-message", {
        message: inputValue,
      });

      const data = res.data;

      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: data.reply || "Sorry, I didn’t quite get that.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: "⚠️ Error connecting to server. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[80vh] bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow">
            <Heart className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Wellness Coach
            </h1>
            <p className="text-xs text-muted-foreground">
              Your emotional support companion
            </p>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-muted/30">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              ref={messagesEndRef}
              key={message.id}
              className={`flex gap-3 items-end ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "bot" && (
                <Avatar className="min-w-8 max-w-8 h-8 bg-primary shadow-sm"></Avatar>
              )}

              <div
                className={`max-w-sm px-4 py-3 rounded-2xl shadow-sm ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm ml-10"
                    : "bg-card text-card-foreground rounded-bl-sm mr-10"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <span
                  className={`text-[10px] mt-1 block text-right ${
                    message.sender === "user"
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {message.sender === "user" && (
                <Avatar className="w-8 h-8 bg-secondary shadow-sm"></Avatar>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start items-end">
              <Avatar className="w-8 h-8 bg-primary shadow-sm"></Avatar>
              <div className="bg-card text-card-foreground px-4 py-3 rounded-2xl mr-10 shadow-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.15s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-card p-4 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-x-2 items-center">
            <Input
              value={inputValue}
              onKeyDown={handleKeyPress}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Share what's on your mind..."
              className="flex-1 bg-input border-border focus:ring-2 focus:ring-ring rounded-xl px-4 py-2 text-sm"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-primary mt-3 cursor-pointer hover:bg-primary/90 text-primary-foreground rounded-xl px-4 py-4.5 shadow"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 text-center italic">
            This is a safe and supportive space. Take your time 💙
          </p>
        </div>
      </div>
    </div>
  );
}
