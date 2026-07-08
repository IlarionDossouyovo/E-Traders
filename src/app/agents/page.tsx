"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";
import {
  Bot,
  Brain,
  TrendingUp,
  Shield,
  MessageSquare,
  BarChart3,
  BookOpen,
  Zap,
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
  FileText,
  Calculator,
  Target,
  Workflow,
  Layers,
  Lightbulb,
  Puzzle,
  Users,
  Lock,
  RefreshCw,
  Save,
  Wand2,
  Bell,
  ArrowLeft,
} from "lucide-react";

// Types d'agents
type AgentStatus = "active" | "inactive" | "error" | "maintenance";

interface AgentCapability {
  icon: React.ElementType;
  label: string;
  description: string;
}

interface Agent {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  status: AgentStatus;
  capabilities: AgentCapability[];
  instructions: string;
  instructionsEn: string;
  enterpriseUse: string[];
  metrics: {
    tasksCompleted: number;
    successRate: number;
    avgResponseTime: string;
  };
  model: string;
  modelConfig?: {
    temperature: number;
    maxTokens: number;
  };
}

// Modèles Ollama disponibles
const OLLAMA_MODELS = [
  { id: 'llama3.2', name: 'Llama 3.2', size: '2.0 GB' },
  { id: 'llama3.1:8b', name: 'Llama 3.1 8B', size: '4.9 GB' },
  { id: 'qwen2.5-coder:7b', name: 'Qwen 2.5 Coder', size: '4.7 GB' },
  { id: 'phi3:mini', name: 'Phi-3 Mini', size: '2.2 GB' },
  { id: 'nomic-embed-text', name: 'Nomic Embed', size: '274 MB' },
];

// Données des agents IA
const agents: Agent[] = [
  {
    id: "signal-generator",
    name: "Signal Generator",
    nameEn: "Signal Generator",
    description: "Génère des signaux de trading basés sur l'analyse technique et l'IA",
    descriptionEn: "Generates trading signals based on technical analysis and AI",
    icon: TrendingUp,
    color: "text-green-400",
    bgGradient: "from-green-500/20 to-emerald-500/10",
    status: "active",
    capabilities: [
      { icon: BarChart3, label: "Analyse Technique", description: "RSI, MACD, Bollinger Bands, Supports/Résistances" },
      { icon: Brain, label: "IA Prédictive", description: "Réseaux neuronaux pour la prédiction des tendances" },
      { icon: Target, label: "Multi-Marchés", description: "Forex, Crypto, Actions, Indices" },
      { icon: Zap, label: "Temps Réel", description: "Analyse en temps réel avec mise à jour continue" },
    ],
    instructions: "Pour activer: Accédez au panneau de configuration et activez le générateur de signaux. Configurez les seuils de confiance et les paires de trading souhaitées.",
    instructionsEn: "To activate: Access the control panel and enable the signal generator. Configure confidence thresholds and desired trading pairs.",
    enterpriseUse: [
      "Analyse automatique des opportunités de marché",
      "Génération de rapports de trading quotidiens",
      "Alertes sur les signaux forts",
      "Optimisation des points d'entrée/sortie",
    ],
    metrics: { tasksCompleted: 1247, successRate: 78, avgResponseTime: "< 2s" },
    model: "llama3.2",
    modelConfig: { temperature: 0.7, maxTokens: 500 },
  },
  {
    id: "risk-manager",
    name: "Risk Manager",
    nameEn: "Risk Manager",
    description: "Gère les risques et protège le portefeuille contre les pertes excessives",
    descriptionEn: "Manages risks and protects portfolio from excessive losses",
    icon: Shield,
    color: "text-red-400",
    bgGradient: "from-red-500/20 to-orange-500/10",
    status: "active",
    capabilities: [
      { icon: AlertTriangle, label: "Surveillance Risques", description: "监控实时风险敞口和头寸规模" },
      { icon: Calculator, label: "Calcul Position", description: "Taille optimale des positions selon le risque" },
      { icon: Settings, label: "Stop Loss Auto", description: "Stop loss dynamiques adaptatifs" },
      { icon: Layers, label: "Diversification", description: "Répartition optimale du portefeuille" },
    ],
    instructions: "Configurez votre tolérance au risque (1-10%) et les paramètres de protection. Le Risk Manager surveillera automatiquement vos positions.",
    instructionsEn: "Configure your risk tolerance (1-10%) and protection parameters. The Risk Manager will automatically monitor your positions.",
    enterpriseUse: [
      "Protection contre les pertes excessives",
      "Gestion dynamic du risque en temps réel",
      "Alertes de risque de liquidité",
      "Conformité avec les limites de risque",
    ],
    metrics: { tasksCompleted: 892, successRate: 99, avgResponseTime: "< 1s" },
    model: "llama3.1:8b",
    modelConfig: { temperature: 0.3, maxTokens: 300 },
  },
  {
    id: "market-sentiment",
    name: "Market Sentiment",
    nameEn: "Market Sentiment",
    description: "Analyse le sentiment du marché via news, réseaux sociaux et données on-chain",
    descriptionEn: "Analyzes market sentiment through news, social media, and on-chain data",
    icon: MessageSquare,
    color: "text-blue-400",
    bgGradient: "from-blue-500/20 to-cyan-500/10",
    status: "active",
    capabilities: [
      { icon: Globe, label: "Actualités", description: "Agrégation de nouvelles financières en temps réel" },
      { icon: MessageCircle, label: "Réseaux Sociaux", description: "Analyse du sentiment Twitter, Reddit, Telegram" },
      { icon: Database, label: "On-Chain", description: "Données blockchain et flux d'échanges" },
      { icon: FileText, label: "Rapports", description: "Génération de rapports de sentiment quotidiens" },
    ],
    instructions: "Sélectionnez les sources d'actualités et configurez les mots-clés追踪。Le sentiment sera calculé et affiché en temps réel.",
    instructionsEn: "Select news sources and configure keywords to track. Sentiment will be calculated and displayed in real-time.",
    enterpriseUse: [
      "Analyse du sentiment avant prise de décision",
      "Détection précoce des tendances virales",
      "Corrélation sentiment/prix",
      "Alertes sur les changements de sentiment",
    ],
    metrics: { tasksCompleted: 2156, successRate: 85, avgResponseTime: "< 3s" },
    model: "llama3.2",
    modelConfig: { temperature: 0.6, maxTokens: 400 },
  },
  {
    id: "ai-tutor",
    name: "AI Tutor",
    nameEn: "AI Tutor",
    description: "Tuteur IA personnalisé pour l'apprentissage du trading et des finances",
    descriptionEn: "Personalized AI tutor for learning trading and finance",
    icon: BookOpen,
    color: "text-yellow-400",
    bgGradient: "from-yellow-500/20 to-amber-500/10",
    status: "active",
    capabilities: [
      { icon: Brain, label: "Apprentissage Adaptatif", description: "Parcours personnalisé selon votre niveau" },
      { icon: Puzzle, label: "Concepts Complexes", description: "Explications simples de stratégies avancées" },
      { icon: MessageSquare, label: "Q&R Interactive", description: "Réponses instantanées à vos questions" },
      { icon: Calculator, label: "Exemples Pratiques", description: "Cas réels et simulations de trading" },
    ],
    instructions: "Sélectionnez votre niveau (Débutant/Intermédiaire/Avancé) et posez vos questions. L'AI Tutor adaptera ses explications à votre profil.",
    instructionsEn: "Select your level (Beginner/Intermediate/Advanced) and ask questions. The AI Tutor will adapt its explanations to your profile.",
    enterpriseUse: [
      "Formation des nouveaux traders",
      "Mise à niveau des équipes trading",
      "Support pédagogique 24/7",
      "Documentation automatique des stratégies",
    ],
    metrics: { tasksCompleted: 3421, successRate: 92, avgResponseTime: "< 5s" },
    model: "llama3.1:8b",
    modelConfig: { temperature: 0.8, maxTokens: 800 },
  },
  {
    id: "scalping-bot",
    name: "Scalping Bot",
    nameEn: "Scalping Bot",
    description: "Bot de trading automatique spécialisé en scalping à haute fréquence",
    descriptionEn: "Automated trading bot specialized in high-frequency scalping",
    icon: Zap,
    color: "text-purple-400",
    bgGradient: "from-purple-500/20 to-pink-500/10",
    status: "active",
    capabilities: [
      { icon: Terminal, label: "Haute Fréquence", description: "Exécution ultra-rapide des ordres" },
      { icon: TrendingUp, label: "Stratégies Multiples", description: "Breakout, Trend, Range, Contre-tendance" },
      { icon: Settings, label: "Paramétrable", description: "Personnalisation complète des stratégies" },
      { icon: Shield, label: "Protection Active", description: "Arrêt d'urgence automatique" },
    ],
    instructions: "Configurez le capital par trade, le timeframe (1m-15m), et activez le mode paper trading pour tester avant trading réel.",
    instructionsEn: "Configure capital per trade, timeframe (1m-15m), and enable paper trading mode to test before real trading.",
    enterpriseUse: [
      "Trading automatisé 24/7",
      "Exploitation des micro-mouvements",
      "Backtesting rapide des stratégies",
      "Portfolio de bots diversifié",
    ],
    metrics: { tasksCompleted: 15678, successRate: 73, avgResponseTime: "< 100ms" },
    model: "qwen2.5-coder:7b",
    modelConfig: { temperature: 0.4, maxTokens: 200 },
  },
  {
    id: "portfolio-tracker",
    name: "Portfolio Tracker",
    nameEn: "Portfolio Tracker",
    description: "Suivi intelligent du portefeuille avec analytics et recommandations",
    descriptionEn: "Smart portfolio tracking with analytics and recommendations",
    icon: BarChart3,
    color: "text-cyan-400",
    bgGradient: "from-cyan-500/20 to-teal-500/10",
    status: "active",
    capabilities: [
      { icon: Layers, label: "Vue Globale", description: "Tous les actifs sur tous les marchés" },
      { icon: TrendingUp, label: "Performance", description: "P&L en temps réel et historique" },
      { icon: Target, label: "Allocation", description: "Répartition recommandée du capital" },
      { icon: FileText, label: "Rapports", description: "États financiers et fiscales détaillés" },
    ],
    instructions: "Connectez vos comptes via API ou saisissez manuellement vos positions. Le tracker calculera automatiquement les performances.",
    instructionsEn: "Connect your accounts via API or manually enter positions. The tracker will automatically calculate performance.",
    enterpriseUse: [
      "Suivi multi-comptes consolidé",
      "Rapports de performance clients",
      "Optimisation fiscale",
      "Analyse de corrélation des actifs",
    ],
    metrics: { tasksCompleted: 892, successRate: 100, avgResponseTime: "< 1s" },
    model: "llama3.2",
    modelConfig: { temperature: 0.5, maxTokens: 300 },
  },
  {
    id: "workflow-automation",
    name: "Workflow Automation",
    nameEn: "Workflow Automation",
    description: "Automatisation des workflows d'entreprise et processus métier",
    descriptionEn: "Automation of enterprise workflows and business processes",
    icon: Workflow,
    color: "text-orange-400",
    bgGradient: "from-orange-500/20 to-red-500/10",
    status: "active",
    capabilities: [
      { icon: Layers, label: "Chainage", description: "Enchaînement automatique des tâches" },
      { icon: Calendar, label: "Planification", description: "Exécution programmée de workflows" },
      { icon: Mail, label: "Notifications", description: "Alertes et rapports automatiques" },
      { icon: Database, label: "Intégration", description: "Connexion API multi-sources" },
    ],
    instructions: "Créez des workflows via l'interface visuelle ou l'API. Déclenchez manuellement ou automatiquement selon un calendrier.",
    instructionsEn: "Create workflows via visual interface or API. Trigger manually or automatically on a schedule.",
    enterpriseUse: [
      "Automatisation des reportings",
      "Processus d'onboarding client",
      "Alertes de trading automatisées",
      "Synchronisation multi-plateformes",
    ],
    metrics: { tasksCompleted: 4521, successRate: 97, avgResponseTime: "< 2s" },
    model: "llama3.1:8b",
    modelConfig: { temperature: 0.6, maxTokens: 400 },
  },
  {
    id: "research-assistant",
    name: "Research Assistant",
    nameEn: "Research Assistant",
    description: "Assistant de recherche pour l'analyse fondamentale et les opportunités d'investissement",
    descriptionEn: "Research assistant for fundamental analysis and investment opportunities",
    icon: Lightbulb,
    color: "text-indigo-400",
    bgGradient: "from-indigo-500/20 to-purple-500/10",
    status: "inactive",
    capabilities: [
      { icon: Globe, label: "Recherche Globale", description: "Analyse de données financières mondiales" },
      { icon: FileText, label: "Rapports", description: "Génération de notes de recherche automatisées" },
      { icon: Target, label: "Opportunités", description: "Identification d'opportunités d'investissement" },
      { icon: Brain, label: "Comparaison", description: "Analyse comparative d'actifs" },
    ],
    instructions: "Définissez vos critères d'investissement et l'assistant générera des rapports personnalisés.",
    instructionsEn: "Define your investment criteria and the assistant will generate personalized reports.",
    enterpriseUse: [
      "Veille stratégique concurrentielle",
      "Recherche d'opportunités d'arbitrage",
      "Analyse sectorielle",
      "Due diligence automatisée",
    ],
    metrics: { tasksCompleted: 234, successRate: 81, avgResponseTime: "< 10s" },
    model: "llama3.2",
    modelConfig: { temperature: 0.7, maxTokens: 600 },
  },
];

// Composant carte agent
function AgentCard({ agent, onToggle, isFounder = false, ollamaConnected = false }: { 
  agent: Agent; 
  onToggle: (id: string) => void;
  isFounder?: boolean;
  ollamaConnected?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  const getStatusBadge = (status: AgentStatus) => {
    const config = {
      active: { label: "Actif", color: "bg-green-500/20 text-green-400", icon: CheckCircle2 },
      inactive: { label: "Inactif", color: "bg-gray-500/20 text-gray-400", icon: Pause },
      error: { label: "Erreur", color: "bg-red-500/20 text-red-400", icon: XCircle },
      maintenance: { label: "Maintenance", color: "bg-yellow-500/20 text-yellow-400", icon: Settings },
    };
    const { label, color, icon: Icon } = config[status];
    return (
      <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium", color)}>
        <Icon size={12} />
        {label}
      </span>
    );
  };

  const modelInfo = OLLAMA_MODELS.find(m => m.id === agent.model);

  return (
    <div className={cn(
      "group relative overflow-hidden rounded-2xl border transition-all duration-300",
      "bg-premium-900/50 border-dark-border hover:border-dark-hover",
      "hover:shadow-lg hover:shadow-black/20"
    )}>
      {/* Gradient Background */}
      <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br", agent.bgGradient)} />
      
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={cn("p-3 rounded-xl bg-gradient-to-br", agent.bgGradient, "border border-dark-border")}>
              <agent.icon className={cn("w-6 h-6", agent.color)} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                {agent.name}
                {getStatusBadge(agent.status)}
              </h3>
              <p className="text-sm text-gray-400">{agent.description}</p>
            </div>
          </div>
          <button
            onClick={() => onToggle(agent.id)}
            disabled={!isFounder}
            className={cn(
              "p-2 rounded-lg transition-all",
              agent.status === "active" 
                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30" 
                : "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30",
              !isFounder && "opacity-50 cursor-not-allowed"
            )}
          >
            {agent.status === "active" ? <Pause size={18} /> : <Play size={18} />}
          </button>
        </div>

        {/* Capabilities */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {agent.capabilities.slice(0, 4).map((cap, idx) => (
            <div 
              key={idx}
              className="flex items-start gap-2 p-2 rounded-lg bg-dark-bg/50 border border-dark-border/50"
            >
              <cap.icon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-300 truncate">{cap.label}</p>
                <p className="text-[10px] text-gray-500 line-clamp-1">{cap.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Metrics & Model */}
        <div className="flex items-center gap-4 pt-4 border-t border-dark-border">
          <div className="flex-1">
            <p className="text-xs text-gray-500">Tâches</p>
            <p className="text-sm font-semibold text-white">{agent.metrics.tasksCompleted.toLocaleString()}</p>
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500">Succès</p>
            <p className="text-sm font-semibold text-green-400">{agent.metrics.successRate}%</p>
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500">Modèle</p>
            <p className={cn("text-sm font-semibold", ollamaConnected ? "text-purple-400" : "text-gray-500")}>
              {agent.model}
            </p>
          </div>
        </div>

        {/* Model Config (when expanded) */}
        {expanded && (
          <div className="mt-4 p-3 rounded-lg bg-dark-bg/50 border border-dark-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-gray-400">Modèle: </span>
                <span className="text-xs font-medium text-white">{modelInfo?.name || agent.model}</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-gray-500">
                <span>Temp: {agent.modelConfig?.temperature || 0.7}</span>
                <span>Max: {agent.modelConfig?.maxTokens || 500} tokens</span>
              </div>
            </div>
          </div>
        )}

        {/* Expand Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-dark-hover hover:bg-dark-border transition-colors text-sm text-gray-400 hover:text-white"
        >
          {expanded ? "Masquer les détails" : "Voir les détails"}
          <ChevronRight className={cn("w-4 h-4 transition-transform", expanded && "rotate-90")} />
        </button>

        {/* Expanded Content */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-dark-border space-y-4">
            {/* Instructions */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                Instructions d'utilisation
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">{agent.instructions}</p>
            </div>

            {/* Enterprise Use */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Utilisation Entreprise
              </h4>
              <ul className="space-y-1">
                {agent.enterpriseUse.map((use, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-400">
                    <CheckCircle2 className="w-3 h-3 text-electron-gold mt-0.5 flex-shrink-0" />
                    {use}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AgentsPage() {
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [agentsState, setAgentsState] = useState<Record<string, AgentStatus>>(
    Object.fromEntries(agents.map(a => [a.id, a.status]))
  );
  
  // État pour l'authentification fondateur et Ollama
  const [isFounder, setIsFounder] = useState(false);
  const [ollamaConnected, setOllamaConnected] = useState(false);
  const [ollamaModels, setOllamaModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConfig, setShowConfig] = useState<string | null>(null);

  // Simuler la vérification du fondateur (en production, vérifier via session/JWT)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/agents/config?userId=admin');
        const data = await res.json();
        setIsFounder(data.isFounder);
        
        // Vérifier Ollama
        const ollamaRes = await fetch('/api/ollama');
        const ollamaData = await ollamaRes.json();
        setOllamaConnected(ollamaData.connected);
        setOllamaModels(ollamaData.models || []);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleToggleAgent = (id: string) => {
    if (!isFounder) return;
    setAgentsState(prev => ({
      ...prev,
      [id]: prev[id] === "active" ? "inactive" : "active"
    }));
  };

  const activeAgents = Object.values(agentsState).filter(s => s === "active").length;
  const totalTasks = agents.reduce((acc, a) => acc + a.metrics.tasksCompleted, 0);
  const avgSuccess = Math.round(agents.reduce((acc, a) => acc + a.metrics.successRate, 0) / agents.length);

  // Afficher écran d'accès refusé si pas fondateur
  if (!loading && !isFounder) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className={cn("transition-all duration-300", sidebarCollapsed ? "ml-20" : "ml-72")}>
          <div className="p-8 flex items-center justify-center min-h-[80vh]">
            <div className="text-center">
              <Lock className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Accès Réservé aux Fondateurs</h1>
              <p className="text-gray-400 max-w-md">
                Cette page est uniquement accessible aux fondateurs de l'entreprise ELECTRON. 
                Veuillez contacter l'administrateur pour obtenir l'accès.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-electron-gold animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <main className={cn("transition-all duration-300", sidebarCollapsed ? "ml-20" : "ml-72")}>
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="p-2 bg-dark-card border border-dark-border rounded-xl hover:bg-dark-hover transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-8 h-8 text-purple-400" />
                  <h1 className="text-3xl font-bold text-white">Agents IA</h1>
                  {isFounder && (
                    <span className="px-3 py-1 rounded-full bg-electron-gold/20 text-electron-gold text-xs font-medium">
                      Fondateur
                    </span>
                  )}
                </div>
                <p className="text-gray-400">
                  Gérez et configurez tous les agents d'intelligence artificielle de votre plateforme de trading
                </p>
              </div>
            </div>
            <button
              onClick={() => alert('Notifications: Aucune nouvelle alerte')}
              className="p-2 bg-dark-card border border-dark-border rounded-xl hover:bg-dark-hover transition-colors cursor-pointer relative"
            >
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-electron-gold rounded-full"></span>
            </button>
          </div>

          {/* Ollama Status */}
          <div className={cn(
            "p-4 rounded-xl border mb-6 flex items-center justify-between",
            ollamaConnected 
              ? "bg-green-500/10 border-green-500/20" 
              : "bg-red-500/10 border-red-500/20"
          )}>
            <div className="flex items-center gap-3">
              {ollamaConnected ? (
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400" />
              )}
              <div>
                <p className="text-sm font-medium text-white">
                  {ollamaConnected ? "Ollama Connecté" : "Ollama Non Connecté"}
                </p>
                <p className="text-xs text-gray-400">
                  {ollamaConnected 
                    ? `${ollamaModels.filter(m => m.installed).length} modèles installés`
                    : "Démarrez Ollama pour activer les agents IA"
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {ollamaModels.filter(m => m.installed).map(model => (
                <span key={model.id} className="px-2 py-1 rounded bg-dark-bg text-xs text-gray-400">
                  {model.id}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-premium-900/50 border border-dark-border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Bot className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{agents.length}</p>
                  <p className="text-xs text-gray-400">Total Agents</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-premium-900/50 border border-dark-border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{activeAgents}</p>
                  <p className="text-xs text-gray-400">Actifs</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-premium-900/50 border border-dark-border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/20">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{totalTasks.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">Tâches Totales</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-premium-900/50 border border-dark-border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-electron-gold/20">
                  <Sparkles className="w-5 h-5 text-electron-gold" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{avgSuccess}%</p>
                  <p className="text-xs text-gray-400">Succès Moyen</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enterprise Overview */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 border border-purple-500/20 mb-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-purple-500/20">
                <Cpu className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white mb-2">Centre de Commande IA Entreprise</h2>
                <p className="text-sm text-gray-400 mb-4">
                  Cette page centralise la gestion de tous les agents IA de votre infrastructure de trading. 
                  Chaque agent est configuré pour répondre aux besoins spécifiques de votre entreprise, 
                  de l'analyse de marché à l'automatisation complète du trading.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg bg-dark-bg/50 border border-dark-border">
                    <Network className="w-5 h-5 text-cyan-400 mb-2" />
                    <p className="text-xs font-medium text-white">Architecture Distribuée</p>
                    <p className="text-[10px] text-gray-500">Agents communicants via API sécurisée</p>
                  </div>
                  <div className="p-3 rounded-lg bg-dark-bg/50 border border-dark-border">
                    <Shield className="w-5 h-5 text-green-400 mb-2" />
                    <p className="text-xs font-medium text-white">Sécurité Enterprise</p>
                    <p className="text-[10px] text-gray-500">Chiffrement bout en bout</p>
                  </div>
                  <div className="p-3 rounded-lg bg-dark-bg/50 border border-dark-border">
                    <Workflow className="w-5 h-5 text-purple-400 mb-2" />
                    <p className="text-xs font-medium text-white">Workflows Personnalisables</p>
                    <p className="text-[10px] text-gray-500">Chaînez les agents selon vos besoins</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 mb-6">
            <button 
              disabled={!isFounder}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm",
                isFounder 
                  ? "bg-electron-gold/20 text-electron-gold hover:bg-electron-gold/30" 
                  : "bg-dark-hover text-gray-500 cursor-not-allowed"
              )}
            >
              <RotateCcw className="w-4 h-4" />
              Redémarrer Tous
            </button>
            <button 
              disabled={!isFounder}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm",
                isFounder
                  ? "bg-dark-hover hover:bg-dark-border text-gray-400 hover:text-white"
                  : "bg-dark-hover text-gray-500 cursor-not-allowed"
              )}
            >
              <Settings className="w-4 h-4" />
              Configuration Globale
            </button>
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <AgentCard 
                key={agent.id} 
                agent={{ ...agent, status: agentsState[agent.id] }} 
                onToggle={handleToggleAgent}
                isFounder={isFounder}
                ollamaConnected={ollamaConnected}
              />
            ))}
          </div>

          {/* Footer Info */}
          <div className="mt-8 p-4 rounded-xl bg-dark-bg/50 border border-dark-border">
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <Sparkles className="w-5 h-5 text-electron-gold" />
              <p>
                <span className="text-white font-medium">Conseil Enterprise:</span>{" "}
                Combinez plusieurs agents pour créer des workflows automatisés puissants. 
                Le Risk Manager devrait toujours être actif pour protéger votre capitale.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
