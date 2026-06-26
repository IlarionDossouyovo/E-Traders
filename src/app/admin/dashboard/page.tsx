"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { agents } from "@/lib/agents/agent-config";
import { cn } from "@/lib/utils";
import {
  Activity,
  Bot,
  Cpu,
  Database,
  Settings,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Play,
  Pause,
  RefreshCw,
  LogOut,
  ChevronRight,
  Zap,
  Shield,
  Newspaper,
  GraduationCap,
  Sword,
  Briefcase,
  Menu,
} from "lucide-react";

// Icônes par agent
const agentIcons: Record<string, React.ReactNode> = {
  'signal-generator': <Zap className="w-5 h-5" />,
  'risk-manager': <Shield className="w-5 h-5" />,
  'market-sentiment': <Newspaper className="w-5 h-5" />,
  'ai-tutor': <GraduationCap className="w-5 h-5" />,
  'scalping-bot': <Sword className="w-5 h-5" />,
  'portfolio-tracker': <Briefcase className="w-5 h-5" />,
};

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'logs' | 'settings'>('overview');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Vérifier l'authentification
  useEffect(() => {
    const storedAuth = localStorage.getItem('e-traders-admin-auth');
    if (storedAuth === 'authenticated') {
      setIsAuthenticated(true);
      setShowLogin(false);
    }
  }, []);

  // Auto-refresh toutes les 30 secondes
  useEffect(() => {
    const interval = setInterval(() => setLastUpdate(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    const validCodes = ['ELECTRON-2024', 'admin', 'founder'];
    if (validCodes.includes(accessCode)) {
      localStorage.setItem('e-traders-admin-auth', 'authenticated');
      setIsAuthenticated(true);
      setShowLogin(false);
      setError("");
    } else {
      setError("Code d'accès invalide");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('e-traders-admin-auth');
    setIsAuthenticated(false);
    setShowLogin(true);
    setAccessCode("");
  };

  // Page de connexion
  if (showLogin || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500/20 rounded-full mb-4">
              <Settings className="w-10 h-10 text-yellow-500" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">E-Traders By ELECTRON</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
            <div className="text-center mb-6">
              <Shield className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white">Accès Réservé</h2>
              <p className="text-gray-400 text-sm">Administration du système</p>
            </div>

            <div className="space-y-4">
              <div>
                <input
                  type="password"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Code d'accès admin..."
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>

              <button
                onClick={handleLogin}
                className="w-full py-3 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-400 transition-colors"
              >
                Confirmer
              </button>
            </div>

            <p className="text-gray-500 text-xs text-center mt-6">
              🔒 Accès restreint à l'administrateur
            </p>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => router.push('/')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Retour au Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculer les stats
  const totalAgents = agents.length;
  const activeAgents = agents.filter(a => a.status === 'online').length;
  const totalJobs = agents.reduce((acc, a) => acc + a.jobs.length, 0);
  const activeJobs = agents.reduce((acc, a) => acc + a.jobs.filter(j => j.status === 'active').length, 0);
  const totalTasks = agents.reduce((acc, a) => acc + a.performance.tasksCompleted, 0);
  const avgSuccessRate = agents.reduce((acc, a) => acc + a.performance.successRate, 0) / agents.length;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-30 h-16 px-6 flex items-center justify-between bg-slate-900/80 backdrop-blur-xl border-b border-slate-700">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/')}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            ←
          </button>
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-yellow-500" />
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm">
            <RefreshCw className="w-4 h-4 text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-gray-400">Auto-refresh</span>
          </div>
          <span className="text-gray-500 text-sm">
            Dernière mise à jour: {lastUpdate.toLocaleTimeString()}
          </span>
          <button
            onClick={handleLogout}
            className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Agents Actifs"
            value={`${activeAgents}/${totalAgents}`}
            subtitle="en ligne"
            icon={<Bot className="w-6 h-6 text-yellow-500" />}
            color="text-yellow-500"
          />
          <StatCard
            title="Tâches Actives"
            value={`${activeJobs}/${totalJobs}`}
            subtitle="schedulées"
            icon={<Clock className="w-6 h-6 text-blue-500" />}
            color="text-blue-500"
          />
          <StatCard
            title="Tâches Totales"
            value={totalTasks.toLocaleString()}
            subtitle="exécutées"
            icon={<Activity className="w-6 h-6 text-green-500" />}
            color="text-green-500"
          />
          <StatCard
            title="Taux de Réussite"
            value={`${avgSuccessRate.toFixed(1)}%`}
            subtitle="moyen"
            icon={<TrendingUp className="w-6 h-6 text-purple-500" />}
            color="text-purple-500"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-700">
          {[
            { id: 'overview', label: 'Vue d\'ensemble', icon: <Activity className="w-4 h-4" /> },
            { id: 'agents', label: 'Agents', icon: <Bot className="w-4 h-4" /> },
            { id: 'logs', label: 'Logs', icon: <LogOut className="w-4 h-4" /> },
            { id: 'settings', label: 'Paramètres', icon: <Settings className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors",
                activeTab === tab.id
                  ? "bg-slate-800 text-yellow-500 border-t border-x border-slate-700"
                  : "text-gray-400 hover:text-white"
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Status */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-yellow-500" />
                Statut du Système
              </h3>
              <div className="space-y-3">
                <SystemStatusItem
                  name="Docker"
                  status="connected"
                  containers={3}
                />
                <SystemStatusItem
                  name="Ollama"
                  status="available"
                  model="llama3.2"
                />
                <SystemStatusItem
                  name="PostgreSQL"
                  status="connected"
                  containers={1}
                />
                <SystemStatusItem
                  name="Redis"
                  status="connected"
                  containers={1}
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Actions Rapides
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <QuickActionButton
                  label="Démarrer tous les agents"
                  icon={<Play className="w-4 h-4" />}
                  onClick={() => alert("Démarrage de tous les agents...")}
                />
                <QuickActionButton
                  label="Arrêter tous les agents"
                  icon={<Pause className="w-4 h-4" />}
                  onClick={() => alert("Arrêt de tous les agents...")}
                />
                <QuickActionButton
                  label="Redémarrer Ollama"
                  icon={<RefreshCw className="w-4 h-4" />}
                  onClick={() => alert("Redémarrage d'Ollama...")}
                />
                <QuickActionButton
                  label="Voir logs"
                  icon={<LogOut className="w-4 h-4" />}
                  onClick={() => setActiveTab('logs')}
                />
              </div>
            </div>

            {/* Agents Grid */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 lg:col-span-2">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Bot className="w-5 h-5 text-yellow-500" />
                Tous les Agents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    onClick={() => setSelectedAgent(agent.id)}
                    className="p-4 bg-slate-900 border border-slate-700 rounded-xl cursor-pointer hover:border-yellow-500/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{agent.icon}</span>
                      <StatusBadge status={agent.status} />
                    </div>
                    <h4 className="font-bold text-white text-sm">{agent.name}</h4>
                    <p className="text-gray-500 text-xs">{agent.jobs.filter(j => j.status === 'active').length}/{agent.jobs.length} tâches actives</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Agents Tab */}
        {activeTab === 'agents' && (
          <div className="space-y-4">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{agent.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-white">{agent.name}</h3>
                      <p className="text-gray-400 text-sm">{agent.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={agent.status} />
                    <button className="p-2 bg-slate-700 rounded-lg text-gray-400 hover:text-white transition-colors">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <MetricCard label="Tâches complétées" value={agent.performance.tasksCompleted.toLocaleString()} />
                  <MetricCard label="Taux de réussite" value={`${agent.performance.successRate}%`} />
                  <MetricCard label="Temps moyen" value={`${agent.performance.avgResponseTime}s`} />
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Tâches:</h4>
                  {agent.jobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-3 bg-slate-900 rounded-lg">
                      <div>
                        <p className="text-white text-sm">{job.title}</p>
                        <p className="text-gray-500 text-xs">{job.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-xs">{job.schedule || 'Manuel'}</span>
                        <JobStatusBadge status={job.status} />
                        <button className="p-1 text-gray-400 hover:text-white">
                          {job.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Logs Tab */}
        {activeTab === 'logs' && (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <LogOut className="w-5 h-5 text-yellow-500" />
              Logs d'Activité
            </h3>
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm max-h-96 overflow-y-auto">
              {[
                { time: '2024-01-15 14:32:05', level: 'INFO', message: 'Signal Generator: Signal buy EUR/USD confidence 92%' },
                { time: '2024-01-15 14:30:22', level: 'INFO', message: 'Risk Manager: Position size calculated 2.5%' },
                { time: '2024-01-15 14:28:15', level: 'WARN', message: 'Market Sentiment: High volatility detected' },
                { time: '2024-01-15 14:25:00', level: 'INFO', message: 'Portfolio Tracker: P&L updated +$1,250' },
                { time: '2024-01-15 14:20:45', level: 'INFO', message: 'Scalping Bot: Trade executed EUR/USD buy' },
                { time: '2024-01-15 14:15:30', level: 'INFO', message: 'AI Tutor: New session started' },
                { time: '2024-01-15 14:10:12', level: 'ERROR', message: 'Ollama: Model loading...' },
              ].map((log, i) => (
                <div key={i} className="flex gap-3 py-1 border-b border-slate-800 last:border-0">
                  <span className="text-gray-500">{log.time}</span>
                  <span className={cn(
                    "w-16",
                    log.level === 'ERROR' ? 'text-red-500' :
                    log.level === 'WARN' ? 'text-yellow-500' : 'text-green-500'
                  )}>{log.level}</span>
                  <span className="text-gray-300">{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-yellow-500" />
              Paramètres Système
            </h3>
            <div className="space-y-4">
              <SettingItem
                label="Ollama Endpoint"
                value="http://localhost:11434"
              />
              <SettingItem
                label="Docker Endpoint"
                value="http://localhost:2375"
              />
              <SettingItem
                label="Auto-refresh"
                value="30 secondes"
              />
              <SettingItem
                label="Logs retention"
                value="7 jours"
              />
              <button className="mt-4 px-6 py-2 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-400 transition-colors">
                Sauvegarder
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-slate-800 border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{agents.find(a => a.id === selectedAgent)?.icon}</span>
                <h2 className="text-2xl font-bold text-white">{agents.find(a => a.id === selectedAgent)?.name}</h2>
              </div>
              <button
                onClick={() => setSelectedAgent(null)}
                className="p-2 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-400 mb-4">{agents.find(a => a.id === selectedAgent)?.description}</p>
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm">
              <pre className="text-gray-300 whitespace-pre-wrap">
                {agents.find(a => a.id === selectedAgent)?.instructions}
              </pre>
            </div>
            <button
              onClick={() => setSelectedAgent(null)}
              className="mt-4 w-full py-2 bg-slate-700 text-white rounded-xl hover:bg-slate-600"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Components
function StatCard({ title, value, subtitle, icon, color }: { title: string; value: string; subtitle: string; icon: React.ReactNode; color: string }) {
  return (
    <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl">
      <div className="flex items-start justify-between mb-2">
        <span className={color}>{icon}</span>
      </div>
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-gray-500 text-xs">{subtitle}</p>
    </div>
  );
}

function SystemStatusItem({ name, status, containers, model }: { name: string; status: string; containers?: number; model?: string }) {
  const isConnected = status === 'connected' || status === 'available';
  return (
    <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg">
      <div className="flex items-center gap-2">
        {isConnected ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
        <span className="text-white">{name}</span>
      </div>
      <span className="text-gray-500 text-sm">
        {containers ? `${containers} conteneur(s)` : model || status}
      </span>
    </div>
  );
}

function QuickActionButton({ label, icon, onClick }: { label: string; icon: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 p-3 bg-slate-900 border border-slate-700 rounded-xl text-white hover:border-yellow-500/50 transition-colors"
    >
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    online: 'bg-green-500/20 text-green-500',
    offline: 'bg-gray-500/20 text-gray-500',
    busy: 'bg-yellow-500/20 text-yellow-500',
    error: 'bg-red-500/20 text-red-500',
  };

  return (
    <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", colors[status])}>
      {status === 'online' ? 'En ligne' : status}
    </span>
  );
}

function JobStatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    active: 'bg-green-500/20 text-green-500',
    paused: 'bg-gray-500/20 text-gray-500',
    error: 'bg-red-500/20 text-red-500',
  };

  return (
    <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", colors[status])}>
      {status === 'active' ? 'Actif' : status}
    </span>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 bg-slate-900 rounded-lg text-center">
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="text-lg font-bold text-white">{value}</p>
    </div>
  );
}

function SettingItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg">
      <span className="text-gray-400">{label}</span>
      <span className="text-white font-mono">{value}</span>
    </div>
  );
}