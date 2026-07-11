"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";
import {
  Bot,
  Brain,
  Shield,
  Lock,
  Key,
  Settings,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Cpu,
  Network,
  Sparkles,
  Terminal,
  Globe,
  Code,
  Database,
  Mail,
  MessageCircle,
  Calendar,
  Calculator,
  Target,
  Workflow,
  Layers,
  Lightbulb,
  Puzzle,
  Users,
  DollarSign,
  PieChart,
  Wallet,
  CreditCard,
  TrendingUp,
  BarChart3,
  Zap,
  Activity,
  RefreshCw,
  Send,
  ArrowLeft,
  X,
  Eye,
  EyeOff,
  Server,
  HardDrive,
  Wifi,
  Bell,
  Search,
  Plus,
  Trash2,
  Edit,
  Save,
  BookOpen,
  FileText,
} from "lucide-react";

// ============================================
// TOUS LES 18 AGENTS IA - CONFIGURATION COMPLÈTE
// ============================================
const ALL_AGENTS = [
  // === AGENTS TRADING (8) ===
  {
    id: "signal-generator",
    name: "Signal Generator",
    model: "llama3.2:latest",
    role: "Générateur de signaux de trading",
    description: "Génère des signaux de trading précis basés sur RSI, MACD, Bollinger Bands",
    capabilities: [
      "Analyse technique (RSI, MACD, Bollinger Bands)",
      "Signaux ACHETER/VENDRE/CONSERVER",
      "Confiance du signal (0-100%)",
      "Support multi-marchés (Forex, Crypto, Actions)"
    ],
    icon: TrendingUp,
    color: "text-accent-green",
    bg: "bg-accent-green/20",
    status: "active"
  },
  {
    id: "risk-manager",
    name: "Risk Manager",
    model: "llama3.1:8b",
    role: "Gestionnaire de risques",
    description: "Protège le portefeuille contre les pertes excessives",
    capabilities: [
      "Calcul de taille de position",
      "Stop-loss dynamiques",
      "Gestion de la diversification",
      "Alertes de risque en temps réel"
    ],
    icon: Shield,
    color: "text-accent-red",
    bg: "bg-accent-red/20",
    status: "active"
  },
  {
    id: "market-sentiment",
    name: "Market Sentiment",
    model: "llama3.2:latest",
    role: "Analyseur de sentiment",
    description: "Analyse le sentiment du marché via news et réseaux sociaux",
    capabilities: [
      "Analyse news financières",
      "Sentiment réseaux sociaux",
      "Données on-chain crypto",
      "Indicateur de peur/avidité"
    ],
    icon: Brain,
    color: "text-purple-400",
    bg: "bg-purple-400/20",
    status: "active"
  },
  {
    id: "ai-tutor",
    name: "AI Tutor",
    model: "llama3.1:8b",
    role: "Tuteur pédagogique",
    description: "Enseigne le trading et la finance de manière interactive",
    capabilities: [
      "Cours adaptatifs",
      "Exemples pratiques",
      "Questions-réponses",
      "Progression personnalisée"
    ],
    icon: BookOpen,
    color: "text-electron-yellow",
    bg: "bg-electron-yellow/20",
    status: "active"
  },
  {
    id: "scalping-bot",
    name: "Scalping Bot",
    model: "qwen2.5-coder:7b",
    role: "Bot de scalping",
    description: "Trading à haute fréquence pour profits rapides",
    capabilities: [
      "Points d'entrée/sortie",
      "Gestion micro-mouvements",
      "Leverage optimization",
      "Execution rapide"
    ],
    icon: Zap,
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/20",
    status: "active"
  },
  {
    id: "portfolio-tracker",
    name: "Portfolio Tracker",
    model: "llama3.2:latest",
    role: "Suivi de portefeuille",
    description: "Surveille les performances et suggère des réallocations",
    capabilities: [
      "P&L en temps réel",
      "Allocation diversifiée",
      "Historique des trades",
      "Recommandations réallocation"
    ],
    icon: Wallet,
    color: "text-electron-gold",
    bg: "bg-electron-gold/20",
    status: "active"
  },
  {
    id: "workflow-automation",
    name: "Workflow Automation",
    model: "llama3.1:8b",
    role: "Automatisation",
    description: "Crée et optimise les processus métier",
    capabilities: [
      "Création de workflows",
      "Automatisation tâches",
      "Intégration APIs",
      "Optimisation processus"
    ],
    icon: Workflow,
    color: "text-blue-400",
    bg: "bg-blue-400/20",
    status: "active"
  },
  {
    id: "research-assistant",
    name: "Research Assistant",
    model: "llama3.2:latest",
    role: "Assistant recherche",
    description: "Recherche d'opportunités d'investissement",
    capabilities: [
      "Analyse fondamentale",
      "Recherche opportunités",
      "Rapports d'analyse",
      "Veille stratégique"
    ],
    icon: Search,
    color: "text-indigo-400",
    bg: "bg-indigo-400/20",
    status: "active"
  },
  // === AGENTS SUPPORT & SYSTÈME (2) ===
  {
    id: "help-maintenance",
    name: "Help & Maintenance",
    model: "llama3.2:latest",
    role: "Support technique",
    description: "Aide les utilisateurs et gère la maintenance",
    capabilities: [
      "Support technique",
      "Guide maintenance",
      "Résolution incidents",
      "Documentation"
    ],
    icon: Settings,
    color: "text-orange-400",
    bg: "bg-orange-400/20",
    status: "active"
  },
  {
    id: "system-monitor",
    name: "System Monitor",
    model: "llama3.1:8b",
    role: "Surveillance système",
    description: "Surveille la santé des services",
    capabilities: [
      "Monitoring services",
      "Alertes performance",
      "Analyse logs",
      "Recommandations"
    ],
    icon: Server,
    color: "text-cyan-400",
    bg: "bg-cyan-400/20",
    status: "active"
  },
  // === AGENTS ENTREPRISE (8) ===
  {
    id: "hr-manager",
    name: "HR Manager",
    model: "llama3.1:8b",
    role: "Ressources humaines",
    description: "Gestion des employés et recrutement",
    capabilities: [
      "Recrutement",
      "Formation employés",
      "Gestion contrats",
      "Planning RH"
    ],
    icon: Users,
    color: "text-pink-400",
    bg: "bg-pink-400/20",
    status: "active"
  },
  {
    id: "financial-analyst",
    name: "Financial Analyst",
    model: "llama3.2:latest",
    role: "Analyse financière",
    description: "Analyse budgétaire et prévisionnelle",
    capabilities: [
      "Analyse budgétaire",
      "Prévisions financières",
      "Santé financière",
      "Rapports financiers"
    ],
    icon: Calculator,
    color: "text-green-400",
    bg: "bg-green-400/20",
    status: "active"
  },
  {
    id: "compliance-officer",
    name: "Compliance Officer",
    model: "llama3.1:8b",
    role: "Conformité réglementaire",
    description: "Veille au respect des réglementations",
    capabilities: [
      "Réglementations AMF/ACPR",
      "Prévention blanchiment",
      "Protection données",
      "Audits conformité"
    ],
    icon: Shield,
    color: "text-red-400",
    bg: "bg-red-400/20",
    status: "active"
  },
  {
    id: "customer-success",
    name: "Customer Success",
    model: "llama3.2:latest",
    role: "Support client",
    description: "Gestion de la relation client",
    capabilities: [
      "Support utilisateur",
      "Onboarding",
      "Satisfaction client",
      "Gestion tickets"
    ],
    icon: MessageCircle,
    color: "text-teal-400",
    bg: "bg-teal-400/20",
    status: "active"
  },
  {
    id: "marketing-manager",
    name: "Marketing Manager",
    model: "llama3.2:latest",
    role: "Marketing digital",
    description: "Stratégies et campagnes marketing",
    capabilities: [
      "Stratégie marketing",
      "Campagnes publicitaires",
      "Analyse performances",
      "SEO/SEA"
    ],
    icon: Target,
    color: "text-rose-400",
    bg: "bg-rose-400/20",
    status: "active"
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    model: "llama3.1:8b",
    role: "Analyse de données",
    description: "Data mining et visualisation",
    capabilities: [
      "Data mining",
      "Visualisations",
      "Insights données",
      "Tableaux de bord"
    ],
    icon: BarChart3,
    color: "text-violet-400",
    bg: "bg-violet-400/20",
    status: "active"
  },
  {
    id: "security-analyst",
    name: "Security Analyst",
    model: "llama3.1:8b",
    role: "Sécurité IT",
    description: "Surveillance et protection des systèmes",
    capabilities: [
      "Surveillance menaces",
      "Gestion pare-feu",
      "Sécurité données",
      "Audits sécurité"
    ],
    icon: Lock,
    color: "text-yellow-400",
    bg: "bg-yellow-400/20",
    status: "active"
  },
  {
    id: "legal-assistant",
    name: "Legal Assistant",
    model: "llama3.2:latest",
    role: "Assistant juridique",
    description: "Aide juridique et rédaction",
    capabilities: [
      "Rédaction contrats",
      "Analyse clauses",
      "Suivi affaires",
      "Compliance juridique"
    ],
    icon: FileText,
    color: "text-slate-400",
    bg: "bg-slate-400/20",
    status: "active"
  },
  {
    id: "operations-manager",
    name: "Operations Manager",
    model: "llama3.1:8b",
    role: "Directeur des opérations",
    description: "Optimisation des processus",
    capabilities: [
      "Optimisation processus",
      "Gestion supply chain",
      "KPIs opérationnels",
      "Efficacité opérationnelle"
    ],
    icon: Layers,
    color: "text-amber-400",
    bg: "bg-amber-400/20",
    status: "active"
  }
];

// ============================================
// TYPES
// ============================================
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface AgentConfig {
  enabled: boolean;
  autoRun: boolean;
  customPrompt?: string;
}

// ============================================
// PAGE PRINCIPALE - FONDATEUR
// ============================================
export default function FounderPage() {
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({});
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"agents" | "config" | "system">("agents");
  const [agentConfigs, setAgentConfigs] = useState<Record<string, AgentConfig>>({});
  const [systemStatus, setSystemStatus] = useState({
    ollama: "connecting",
    database: "connected",
    redis: "connected",
    docker: "running"
  });

  // Code secret du fondateur - À MODIFIER PAR LE FONDATEUR
  const FOUNDER_CODE = "ELECTRON-FOUNDER-2024";

  // Vérifier l'autorisation au chargement
  useEffect(() => {
    const savedAuth = localStorage.getItem("founder_auth");
    if (savedAuth === "authorized") {
      setIsAuthorized(true);
    }
    // Initialiser les configs des agents
    const configs: Record<string, AgentConfig> = {};
    ALL_AGENTS.forEach(agent => {
      configs[agent.id] = {
        enabled: true,
        autoRun: false
      };
    });
    setAgentConfigs(configs);
  }, []);

  // Fonction d'authentification
  const handleAuth = () => {
    if (authCode === FOUNDER_CODE) {
      setIsAuthorized(true);
      localStorage.setItem("founder_auth", "authorized");
    } else {
      alert("Code incorrect. Veuillez contacter l'administrateur.");
    }
  };

  // Déconnexion
  const handleLogout = () => {
    setIsAuthorized(false);
    localStorage.removeItem("founder_auth");
    router.push("/");
  };

  // Envoyer un message à un agent
  const sendToAgent = async (agentId: string) => {
    if (!inputMessage.trim() || isLoading) return;

    const newMessages = chatMessages[agentId] || [];
    newMessages.push({ role: "user", content: inputMessage });
    setChatMessages({ ...chatMessages, [agentId]: newMessages });

    setIsLoading(true);
    try {
      const response = await fetch("/api/agents/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId,
          message: inputMessage,
          model: ALL_AGENTS.find(a => a.id === agentId)?.model || "llama3.2"
        })
      });

      const data = await response.json();
      if (data.response) {
        setChatMessages({
          ...chatMessages,
          [agentId]: [...newMessages, { role: "assistant", content: data.response }]
        });
      }
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
      setInputMessage("");
    }
  };

  // ============================================
  // ÉCRAN D'AUTHENTIFICATION
  // ============================================
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-electron-gold/5 to-accent-cyan/5" />
        <div className="relative z-10 w-full max-w-md">
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 shadow-electron">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-electron-gold/20 flex items-center justify-center">
                <Lock className="w-10 h-10 text-electron-gold" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">E-Traders Founder</h1>
              <p className="text-gray-400">Accès restreint - Propriétaire Only</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Code d'accès</label>
                <div className="relative">
                  <input
                    type={showCode ? "text" : "password"}
                    value={authCode}
                    onChange={(e) => setAuthCode(e.target.value)}
                    placeholder="Entrez votre code secret"
                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-electron-gold"
                    onKeyDown={(e) => e.key === "Enter" && handleAuth()}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCode(!showCode)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleAuth}
                className="w-full py-3 bg-electron-gold text-premium-900 font-semibold rounded-xl hover:bg-electron-goldLight transition-colors"
              >
                Vérifier l'accès
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => router.push("/")}
                className="text-gray-400 hover:text-white text-sm"
              >
                ← Retour au tableau de bord
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // INTERFACE FONDATEUR
  // ============================================
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-premium-900 via-dark-bg to-premium-800" />
      
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <main className={cn("relative z-10 transition-all duration-300", sidebarCollapsed ? "ml-20" : "ml-72")}>
        {/* Header */}
        <header className="sticky top-0 z-30 h-20 px-8 flex items-center justify-between bg-dark-bg/60 backdrop-blur-xl border-b border-dark-border/50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-electron-gold/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-electron-gold" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Panel Fondateur</h1>
              <p className="text-sm text-gray-400">Centre de contrôle E-Traders</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* System Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-card rounded-lg">
              <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              <span className="text-sm text-gray-400">Système actif</span>
            </div>
            
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-dark-card border border-dark-border rounded-xl text-gray-400 hover:text-white hover:border-dark-hover transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div className="px-8 pt-6">
          <div className="flex gap-2 border-b border-dark-border">
            <button
              onClick={() => setActiveTab("agents")}
              className={cn(
                "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === "agents"
                  ? "border-electron-gold text-electron-gold"
                  : "border-transparent text-gray-400 hover:text-white"
              )}
            >
              <Bot className="w-4 h-4 inline mr-2" />
              Tous les Agents ({ALL_AGENTS.length})
            </button>
            <button
              onClick={() => setActiveTab("config")}
              className={cn(
                "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === "config"
                  ? "border-electron-gold text-electron-gold"
                  : "border-transparent text-gray-400 hover:text-white"
              )}
            >
              <Settings className="w-4 h-4 inline mr-2" />
              Configuration
            </button>
            <button
              onClick={() => setActiveTab("system")}
              className={cn(
                "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === "system"
                  ? "border-electron-gold text-electron-gold"
                  : "border-transparent text-gray-400 hover:text-white"
              )}
            >
              <Server className="w-4 h-4 inline mr-2" />
              Système
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {activeTab === "agents" && (
            <div className="space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-dark-card border border-dark-border rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-electron-gold/20 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-electron-gold" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{ALL_AGENTS.length}</p>
                      <p className="text-sm text-gray-400">Agents IA</p>
                    </div>
                  </div>
                </div>
                <div className="bg-dark-card border border-dark-border rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent-green/20 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-accent-green" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{ALL_AGENTS.filter(a => a.status === "active").length}</p>
                      <p className="text-sm text-gray-400">Actifs</p>
                    </div>
                  </div>
                </div>
                <div className="bg-dark-card border border-dark-border rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent-cyan/20 flex items-center justify-center">
                      <Cpu className="w-5 h-5 text-accent-cyan" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">5</p>
                      <p className="text-sm text-gray-400">Modèles Ollama</p>
                    </div>
                  </div>
                </div>
                <div className="bg-dark-card border border-dark-border rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-400/20 flex items-center justify-center">
                      <Database className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">Connecté</p>
                      <p className="text-sm text-gray-400">Base de données</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agents Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ALL_AGENTS.map((agent) => (
                  <div
                    key={agent.id}
                    className={cn(
                      "bg-dark-card border rounded-xl p-4 cursor-pointer transition-all hover:border-electron-gold/50",
                      selectedAgent === agent.id ? "border-electron-gold" : "border-dark-border"
                    )}
                    onClick={() => setSelectedAgent(agent.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", agent.bg)}>
                        <agent.icon className={cn("w-5 h-5", agent.color)} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "px-2 py-0.5 text-xs rounded-full",
                          agent.status === "active" ? "bg-accent-green/20 text-accent-green" : "bg-gray-500/20 text-gray-400"
                        )}>
                          {agent.status === "active" ? "Actif" : "Inactif"}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-white mb-1">{agent.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">{agent.role}</p>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Brain className="w-3 h-3" />
                      <span>{agent.model}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "config" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white mb-4">Configuration des Agents</h2>
              {ALL_AGENTS.map((agent) => (
                <div key={agent.id} className="bg-dark-card border border-dark-border rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", agent.bg)}>
                        <agent.icon className={cn("w-4 h-4", agent.color)} />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{agent.name}</h3>
                        <p className="text-xs text-gray-400">{agent.model}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={agentConfigs[agent.id]?.enabled ?? true}
                          onChange={(e) => setAgentConfigs({
                            ...agentConfigs,
                            [agent.id]: { ...agentConfigs[agent.id], enabled: e.target.checked }
                          })}
                          className="w-4 h-4 rounded border-dark-border bg-dark-bg text-electron-gold focus:ring-electron-gold"
                        />
                        <span className="text-sm text-gray-400">Activé</span>
                      </label>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-dark-border">
                    <p className="text-xs text-gray-500 mb-2">Capabilités:</p>
                    <div className="flex flex-wrap gap-1">
                      {agent.capabilities.map((cap, i) => (
                        <span key={i} className="px-2 py-0.5 bg-dark-bg rounded text-xs text-gray-400">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "system" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">État du Système</h2>
              
              {/* Docker & Services */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-dark-card border border-dark-border rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <Database className="w-4 h-4 text-electron-gold" />
                    Base de données
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">PostgreSQL</span>
                      <span className="text-accent-green flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Connecté
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Redis</span>
                      <span className="text-accent-green flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Connecté
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Docker</span>
                      <span className="text-accent-green flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Actif
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-dark-card border border-dark-border rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-electron-gold" />
                    IA - Ollama
                  </h3>
                  <div className="space-y-2">
                    {["llama3.2:latest", "llama3.1:8b", "qwen2.5-coder:7b", "nomic-embed-text:latest", "phi3:mini"].map((model) => (
                      <div key={model} className="flex justify-between text-sm">
                        <span className="text-gray-400 truncate max-w-[150px]">{model}</span>
                        <span className="text-accent-green flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Installé
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Informations sensibles */}
              <div className="bg-dark-card border border-dark-border rounded-xl p-4">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Key className="w-4 h-4 text-electron-gold" />
                  Clés API Configurées
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">OLLAMA_API_KEY</span>
                    <span className="text-gray-500">••••••••••••</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">BINANCE_API_KEY</span>
                    <span className="text-gray-500">Non configurée</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">JWT_SECRET</span>
                    <span className="text-gray-500">••••••••••••</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Panel */}
        {selectedAgent && (
          <div className="fixed inset-y-20 right-0 w-96 bg-dark-card border-l border-dark-border shadow-xl z-20 flex flex-col">
            <div className="p-4 border-b border-dark-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", ALL_AGENTS.find(a => a.id === selectedAgent)?.bg)}>
                  {React.createElement(ALL_AGENTS.find(a => a.id === selectedAgent)?.icon || Bot, {
                    className: cn("w-4 h-4", ALL_AGENTS.find(a => a.id === selectedAgent)?.color)
                  })}
                </div>
                <div>
                  <h3 className="font-medium text-white">{ALL_AGENTS.find(a => a.id === selectedAgent)?.name}</h3>
                  <p className="text-xs text-gray-400">{ALL_AGENTS.find(a => a.id === selectedAgent)?.model}</p>
                </div>
              </div>
              <button onClick={() => setSelectedAgent(null)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {(!chatMessages[selectedAgent] || chatMessages[selectedAgent].length === 0) && (
                <div className="text-center text-gray-500 py-8">
                  <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Commencez une conversation avec {ALL_AGENTS.find(a => a.id === selectedAgent)?.name}</p>
                </div>
              )}
              {chatMessages[selectedAgent]?.map((msg, i) => (
                <div key={i} className={cn(
                  "p-3 rounded-lg text-sm",
                  msg.role === "user" ? "bg-electron-gold/20 text-white ml-8" : "bg-dark-bg text-gray-300 mr-8"
                )}>
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="bg-dark-bg p-3 rounded-lg text-gray-400 mr-8">
                  <RefreshCw className="w-4 h-4 animate-spin" /> Analyse en cours...
                </div>
              )}
            </div>

            <div className="p-4 border-t border-dark-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Tapez votre message..."
                  className="flex-1 px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-electron-gold"
                  onKeyDown={(e) => e.key === "Enter" && sendToAgent(selectedAgent)}
                />
                <button
                  onClick={() => sendToAgent(selectedAgent)}
                  disabled={isLoading}
                  className="p-2 bg-electron-gold text-premium-900 rounded-lg hover:bg-electron-goldLight disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
