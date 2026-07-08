"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { cn, formatCurrency, formatPercent } from "@/lib/utils";
import {
  Bot,
  Zap,
  Clock,
  Shield,
  Play,
  Pause,
  Settings,
  Plus,
  Trash2,
  Edit,
  BarChart3,
  Activity,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";

// Trading modes
const tradingModes = [
  {
    id: "scalping",
    name: "Scalping",
    description: "Trades rapides à haute fréquence",
    icon: Zap,
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/20",
    stats: { trades: 156, winRate: "78%", profit: "+$4,320" },
  },
  {
    id: "swing",
    name: "Swing Trading",
    description: "Trades moyen terme (jours/semaines)",
    icon: BarChart3,
    color: "text-purple-400",
    bg: "bg-purple-400/20",
    stats: { trades: 24, winRate: "65%", profit: "+$8,750" },
  },
  {
    id: "algo",
    name: "Algo Trading",
    description: "Bots personnalisés",
    icon: Bot,
    color: "text-electron-gold",
    bg: "bg-electron-gold/20",
    stats: { trades: 312, winRate: "82%", profit: "+$15,420" },
  },
];

// Active positions
const activePositions = [
  { id: "1", pair: "EUR/USD", side: "long", entry: 1.0850, current: 1.0892, quantity: 100000, pnl: 420, pnlPercent: 0.39, mode: "scalping", status: "active" },
  { id: "2", pair: "BTC/USDT", side: "long", entry: 65000, current: 67430, quantity: 0.5, pnl: 1215, pnlPercent: 3.73, mode: "algo", status: "active" },
  { id: "3", pair: "AAPL", side: "short", entry: 180, current: 178.50, quantity: 100, pnl: 150, pnlPercent: 0.83, mode: "swing", status: "active" },
];

// Configure bots
const bots = [
  { id: "1", name: "Scalper Pro", pair: "EUR/USD", mode: "scalping", status: "running", profit: "+$2,450", trades: 89 },
  { id: "2", name: "Swing Master", pair: "AAPL", mode: "swing", status: "paused", profit: "+$5,230", trades: 12 },
  { id: "3", name: "Crypto Bot", pair: "BTC/USDT", mode: "algo", status: "running", profit: "+$8,920", trades: 234 },
];

export default function TradingPage() {
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedMode, setSelectedMode] = useState<string>("scalping");
  const [showBotModal, setShowBotModal] = useState(false);

  return (
    <div className="min-h-screen bg-dark-bg">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <main className={cn("transition-all duration-300 z-10 relative", sidebarCollapsed ? "ml-20" : "ml-72")}>
        {/* Header */}
        <header className="sticky top-0 z-30 h-20 px-8 flex items-center justify-between bg-dark-bg/80 backdrop-blur-xl border-b border-dark-border">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Trading Automatique</h1>
            <p className="text-gray-400">Configurez et gérez vos robots de trading ELECTRON</p>
          </div>
          
          <button
            onClick={() => {
              console.log("Nouveau Robot cliqué!");
              alert("Bouton cliqué!");
              setShowBotModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-electron-gold text-premium-900 font-semibold rounded-xl hover:bg-electron-goldLight transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Nouveau Robot
          </button>
        </header>
        
        <div className="p-8">
        {/* Trading Modes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {tradingModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <div
                key={mode.id}
                onClick={() => {
                  console.log("Mode cliqué:", mode.id);
                  setSelectedMode(mode.id);
                }}
                className={cn(
                  "p-6 bg-dark-card border rounded-2xl cursor-pointer transition-all",
                  selectedMode === mode.id
                    ? "border-electron-gold shadow-electron"
                    : "border-dark-border hover:border-dark-hover"
                )}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={cn("p-3 rounded-xl", mode.bg)}>
                    <Icon className={cn("w-6 h-6", mode.color)} />
                  </div>
                  {mode.id === "algo" && (
                    <span className="px-2 py-1 bg-electron-gold/20 text-electron-gold text-xs rounded-full">
                      Populaire
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{mode.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{mode.description}</p>
                
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-dark-border">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Trades</p>
                    <p className="font-bold text-white">{mode.stats.trades}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Win Rate</p>
                    <p className="font-bold text-accent-green">{mode.stats.winRate}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Profit</p>
                    <p className="font-bold text-electroGold">{mode.stats.profit}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Risk Management */}
        <div className="p-6 bg-dark-card border border-dark-border rounded-2xl mb-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-accent-green" />
            Gestion du Risque
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <RiskControl
              label="Stop Loss Global"
              value="2.0%"
              description="Perte maximale par trade"
            />
            <RiskControl
              label="Take Profit"
              value="4.0%"
              description="Profit cible par trade"
            />
            <RiskControl
              label="Perte Journalière"
              value="$500"
              description="Limite quotidienne"
            />
            <RiskControl
              label="Exposition Max"
              value="10%"
              description="Du capital par trade"
            />
          </div>
        </div>
        
        {/* Active Positions */}
        <div className="p-6 bg-dark-card border border-dark-border rounded-2xl mb-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-electron-gold" />
            Positions Actives
          </h2>
          
          <div className="space-y-3">
            {activePositions.map((position) => (
              <PositionCard key={position.id} position={position} />
            ))}
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-dark-border">
            <div>
              <p className="text-gray-400 text-sm">Profit Total</p>
              <p className="text-2xl font-bold text-accent-green">+$1,785</p>
            </div>
            <button 
              onClick={() => alert('Fermeture de toutes les positions...')}
              className="px-4 py-2 border border-dark-border text-gray-400 rounded-xl hover:text-white hover:border-electron-gold transition-colors cursor-pointer"
            >
              Fermer Tout
            </button>
          </div>
        </div>
        
        {/* Bots Management */}
        <div className="p-6 bg-dark-card border border-dark-border rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Bot className="w-5 h-5 text-electron-gold" />
            Mes Robots
          </h2>
          
          <div className="space-y-3">
            {bots.map((bot) => (
              <BotCard key={bot.id} bot={bot} />
            ))}
          </div>
          
          <button
            onClick={() => {
              console.log("Ajouter un Robot cliqué");
              setShowBotModal(true);
            }}
            className="w-full mt-4 py-3 border border-dashed border-dark-border text-gray-400 rounded-xl hover:text-white hover:border-electron-gold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Ajouter un Robot
          </button>
        </div>
        </div>
      </main>
    </div>
  );
}

function RiskControl({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="p-4 bg-dark-bg/50 rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400">{label}</span>
        <Edit className="w-4 h-4 text-gray-500 cursor-pointer hover:text-white" />
      </div>
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
}

function PositionCard({ position }: { position: (typeof activePositions)[0] }) {
  const router = useRouter();
  
  return (
    <div className="flex items-center justify-between p-4 bg-dark-bg/50 rounded-xl">
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">{position.pair}</span>
            <span className={cn(
              "px-2 py-0.5 rounded text-xs",
              position.side === "long" ? "bg-accent-green/20 text-accent-green" : "bg-accent-red/20 text-accent-red"
            )}>
              {position.side === "long" ? "LONG" : "SHORT"}
            </span>
          </div>
          <p className="text-sm text-gray-400">
            Entrée: {position.entry} • Qté: {position.quantity}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-white font-medium">Actuel: {position.current}</p>
          <p className={cn("text-sm", position.pnl >= 0 ? "text-accent-green" : "text-accent-red")}>
            {formatCurrency(position.pnl)} ({formatPercent(position.pnlPercent)})
          </p>
        </div>
        
        <div className="flex gap-2">
          <button onClick={() => router.push('/settings')} className="p-2 hover:bg-dark-hover rounded-lg transition-colors cursor-pointer">
            <Settings className="w-4 h-4 text-gray-400" />
          </button>
          <button onClick={() => alert('Fermeture de la position...')} className="p-2 hover:bg-dark-hover rounded-lg transition-colors cursor-pointer">
            <XCircle className="w-4 h-4 text-accent-red" />
          </button>
        </div>
      </div>
    </div>
  );
}

function BotCard({ bot }: { bot: (typeof bots)[0] }) {
  const router = useRouter();
  
  return (
    <div className="flex items-center justify-between p-4 bg-dark-bg/50 rounded-xl">
      <div className="flex items-center gap-4">
        <div className={cn(
          "p-2 rounded-lg",
          bot.status === "running" ? "bg-accent-green/20" : "bg-gray-500/20"
        )}>
          <Bot className={cn("w-5 h-5", bot.status === "running" ? "text-accent-green" : "text-gray-400")} />
        </div>
        <div>
          <p className="font-medium text-white">{bot.name}</p>
          <p className="text-sm text-gray-400">{bot.pair} • {bot.mode}</p>
        </div>
      </div>
      
              <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-accent-green font-medium">{bot.profit}</p>
          <p className="text-sm text-gray-400">{bot.trades} trades</p>
        </div>
        
        <button 
          onClick={() => alert(bot.status === 'running' ? 'Pause du robot...' : 'Démarrage du robot...')}
          className={cn(
            "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer",
            bot.status === "running"
              ? "bg-accent-red/20 text-accent-red hover:bg-accent-red/30"
              : "bg-accent-green/20 text-accent-green hover:bg-accent-green/30"
          )}
        >
          {bot.status === "running" ? "Pause" : "Démarrer"}
        </button>
        
        <button onClick={() => router.push('/settings')} className="p-2 hover:bg-dark-hover rounded-lg transition-colors cursor-pointer">
          <Settings className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
}