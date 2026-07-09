"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Bot,
  MessageCircle,
  X,
  Send,
  Minimize2,
  Maximize2,
  Sparkles,
  TrendingUp,
  Shield,
  BookOpen,
  BarChart3,
  Wallet,
  Settings,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const quickActions = [
  { icon: TrendingUp, label: "Signaux", color: "text-green-400" },
  { icon: Shield, label: "Risques", color: "text-red-400" },
  { icon: BookOpen, label: "Apprendre", color: "text-yellow-400" },
  { icon: BarChart3, label: "Analyser", color: "text-blue-400" },
  { icon: Wallet, label: "Portefeuille", color: "text-purple-400" },
];

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Bonjour! Je suis votre assistant AI E-Traders. Comment puis-je vous aider aujourd'hui?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Je peux vous aider avec l'analyse technique. Quels graphiques souhaitez-vous examiner?",
        "Pour optimiser votre portefeuille, je recommande une diversification sur plusieurs classes d'actifs.",
        "Le sentiment du marché est actuellement haussier pour le BTC. Voulez-vous plus de détails?",
        "Je surveille les risques en temps réel. Votre exposition actuelle est de 15% du capital.",
        "Voici les signaux de trading pour aujourd'hui: EUR/USD bullish, BTC/USD中性.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: randomResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (label: string) => {
    const actionInputs: Record<string, string> = {
      Signaux: "Donne-moi les signaux de trading du jour",
      Risques: "Analyse les risques de mon portefeuille",
      Apprendre: "Explique-moi le trading scalping",
      Analyser: "Analyse EUR/USD",
      Portefeuille: "État de mon portefeuille",
    };

    setInput(actionInputs[label] || "");
  };

  return (
    <>
      {/* Floating Button - positioned above all content */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 w-16 h-16 rounded-full",
          "bg-gradient-to-r from-electron-gold to-yellow-500",
          "shadow-lg shadow-electron-gold/30",
          "flex items-center justify-center",
          "hover:scale-110 transition-transform duration-300",
          "cursor-pointer"
        )}
        style={{ zIndex: 9999 }}
      >
        <Bot className="w-8 h-8 text-premium-900" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            "fixed bottom-24 right-6 z-[9998] w-96 bg-dark-card border border-dark-border rounded-2xl shadow-2xl",
            "flex flex-col transition-all duration-300",
            isMinimized ? "h-16" : "h-[500px]"
          )}
          style={{ zIndex: 9998 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-dark-border bg-dark-bg/50 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-electron-gold/20 to-yellow-500/20">
                <Sparkles className="w-5 h-5 text-electron-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-white">AI Assistant</h3>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  En ligne
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-dark-hover rounded-lg transition-colors cursor-pointer"
              >
                {isMinimized ? (
                  <Maximize2 className="w-4 h-4 text-gray-400" />
                ) : (
                  <Minimize2 className="w-4 h-4 text-gray-400" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-dark-hover rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          {!isMinimized && (
            <div className="flex gap-2 p-3 border-b border-dark-border overflow-x-auto">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleQuickAction(action.label)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-dark-bg/50 hover:bg-dark-hover rounded-full text-xs text-gray-400 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                >
                  <action.icon className={cn("w-3.5 h-3.5", action.color)} />
                  {action.label}
                </button>
              ))}
            </div>
          )}

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] p-3 rounded-2xl",
                        msg.role === "user"
                          ? "bg-electron-gold text-premium-900 rounded-br-sm"
                          : "bg-dark-bg text-white rounded-bl-sm"
                      )}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-[10px] text-gray-500 mt-1">
                        {msg.timestamp.toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-dark-bg p-3 rounded-2xl rounded-bl-sm">
                      <div className="flex gap-1">
                        {[0, 150, 300].map((delay) => (
                          <div
                            key={delay}
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: `${delay}ms` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-dark-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Posez votre question..."
                    className="flex-1 bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-electron-gold"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isTyping}
                    className="px-4 py-2.5 bg-electron-gold text-premium-900 rounded-xl hover:bg-electron-goldLight disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
