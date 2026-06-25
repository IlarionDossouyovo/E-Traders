"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { agents, isFounder } from "@/lib/agents/agent-config";
import { cn } from "@/lib/utils";
import { 
  Activity, 
  Zap, 
  Shield, 
  Newspaper, 
  GraduationCap, 
  Sword, 
  Briefcase,
  Play,
  Pause,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  Cpu,
  Database,
  Bot,
  ChevronRight,
  X
} from "lucide-react";

// Icônes des agents
const agentIcons = {
  'signal-generator': <Zap className="w-6 h-6" />,
  'risk-manager': <Shield className="w-6 h-6" />,
  'market-sentiment': <Newspaper className="w-6 h-6" />,
  'ai-tutor': <GraduationCap className="w-6 h-6" />,
  'scalping-bot': <Sword className="w-6 h-6" />,
  'portfolio-tracker': <Briefcase className="w-6 h-6" />,
};

export default function AgentsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'connections'>('overview');
  const [connectionStatus, setConnectionStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [agentStatuses, setAgentStatuses] = useState<any>({});

  // Vérifier les connexions au chargement
  useEffect(() => {
    checkConnections();
  }, []);

  const checkConnections = async () => {
    try {
      const res = await fetch('/api/connections');
      const data = await res.json();
      setConnectionStatus(data);
    } catch (e) {
      setConnectionStatus({ overall: 'disconnected' });
    }
  };

  const toggleJob = async (agentId: string, jobId: string, currentStatus: string) => {
    setLoading(true);
    try {
      const newStatus = currentStatus === 'active' ? 'paused' : 'active';
      await fetch('/api/agents', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId, jobId, status: newStatus }),
      });
      setAgentStatuses((prev: any) => ({ ...prev, [jobId]: newStatus }));
    } catch (e) {
      console.error('Erreur:', e);
    }
    setLoading(false);
  };

  const executeAgent = async (agentId: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/agents/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId, prompt: 'Exécuter une analyse' }),
      });
      const data = await res.json();
      alert(`Résultat: ${JSON.stringify(data.result || data.error)}`);
    } catch (e) {
      alert('Erreur lors de l\'exécution');
    }
    setLoading(false);
  };

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const storedAuth = localStorage.getItem('e-traders-founder-auth');
    if (storedAuth === 'authenticated') {
      setIsAuthenticated(true);
      setShowLogin(false);
    }
  }, []);

  const handleLogin = () => {
    // Code d'accès pour le fondateur (à configurer séparément)
    const validCodes = ['ELECTRON-2024', 'admin', 'founder'];
    if (validCodes.includes(accessCode)) {
      localStorage.setItem('e-traders-founder-auth', 'authenticated');
      setIsAuthenticated(true);
      setShowLogin(false);
      setError("");
    } else {
      setError("Code d'accès invalide");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('e-traders-founder-auth');
    setIsAuthenticated(false);
    setShowLogin(true);
    setAccessCode("");
  };

  // Page de connexion
  if (showLogin || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-electron-gold/20 rounded-full mb-4">
              <Bot className="w-10 h-10 text-electron-gold" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Agents AI</h1>
            <p className="text-gray-400">E-Traders By ELECTRON</p>
          </div>

          {/* Formulaire de connexion */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
            <div className="text-center mb-6">
              <Shield className="w-12 h-12 text-electron-gold mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white">Accès Réservé</h2>
              <p className="text-gray-400 text-sm">Entrez votre code d'accès fondateur</p>
            </div>

            <div className="space-y-4">
              <div>
                <input
                  type="password"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Code d'accès..."
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-electron-gold transition-colors"
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
                {error && <p className="text-accent-red text-sm mt-2">{error}</p>}
              </div>

              <button
                onClick={handleLogin}
                className="w-full py-3 bg-electron-gold text-premium-900 font-semibold rounded-xl hover:bg-electron-goldLight transition-colors"
              >
                Confirmer
              </button>
            </div>

            <p className="text-gray-500 text-xs text-center mt-6">
              🔒 Accès restreint au fondateur de l'entreprise
            </p>
          </div>

          {/* Retour au dashboard */}
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

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="sticky top-0 z-30 h-20 px-8 flex items-center justify-between bg-dark-bg/80 backdrop-blur-xl border-b border-dark-border">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/')}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            ←
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Bot className="text-electron-gold" />
              Agents AI Automation 360°
            </h1>
            <p className="text-sm text-gray-400">Plateforme d'automatisation intelligente</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-dark-card border border-dark-border rounded-xl">
            <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">Docker & Ollama Connectés</span>
          </div>
          
          <button
            onClick={handleLogout}
            className="p-3 bg-dark-card border border-dark-border rounded-xl text-gray-400 hover:text-accent-red transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Agents Actifs" 
            value="6" 
            icon={<Bot className="text-electron-gold" />} 
            color="text-electron-gold" 
          />
          <StatCard 
            title="Tâches Aujourd'hui" 
            value="247" 
            icon={<Activity className="text-accent-cyan" />} 
            color="text-accent-cyan" 
          />
          <StatCard 
            title="Taux de Réussite" 
            value="89.2%" 
            icon={<CheckCircle className="text-accent-green" />} 
            color="text-accent-green" 
          />
          <StatCard 
            title="Erreurs" 
            value="3" 
            icon={<XCircle className="text-accent-red" />} 
            color="text-accent-red" 
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-dark-border">
          <TabButton 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')}
            icon={<Bot className="w-4 h-4" />}
            label="Agents"
          />
          <TabButton 
            active={activeTab === 'jobs'} 
            onClick={() => setActiveTab('jobs')}
            icon={<Activity className="w-4 h-4" />}
            label="Tâches"
          />
          <TabButton 
            active={activeTab === 'connections'} 
            onClick={() => setActiveTab('connections')}
            icon={<Database className="w-4 h-4" />}
            label="Connexions"
          />
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div
                key={agent.id}
                onClick={() => setSelectedAgent(agent.id)}
                className={cn(
                  "p-6 bg-dark-card border rounded-2xl cursor-pointer transition-all hover:scale-[1.02]",
                  selectedAgent === agent.id 
                    ? "border-electron-gold" 
                    : "border-dark-border hover:border-electron-gold/50"
                )}
              >
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${agent.color}20` }}
                  >
                    <span className="text-2xl">{agent.icon}</span>
                  </div>
                  <StatusBadge status={agent.status} />
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{agent.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{agent.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex gap-2">
                    {agent.capabilities.slice(0, 2).map((cap) => (
                      <span 
                        key={cap.name}
                        className="px-2 py-1 bg-dark-bg rounded-lg text-gray-400 text-xs"
                      >
                        {cap.icon} {cap.name.split(' ')[0]}
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-500">
                    {agent.performance.tasksCompleted} tâches
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="space-y-4">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-dark-card border border-dark-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{agent.icon}</span>
                    <h3 className="text-lg font-bold text-white">{agent.name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-accent-green/20 text-accent-green text-sm rounded-full">
                    {agent.jobs.filter(j => j.status === 'active').length} actifs
                  </span>
                </div>

                <div className="space-y-3">
                  {agent.jobs.map((job) => (
                    <div 
                      key={job.id}
                      className="flex items-center justify-between p-4 bg-dark-bg/50 rounded-xl"
                    >
                      <div>
                        <h4 className="font-medium text-white">{job.title}</h4>
                        <p className="text-gray-400 text-sm">{job.description}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 text-sm">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {job.schedule || 'Manuel'}
                        </span>
                        <JobStatusBadge status={job.status} />
                        <button className="p-2 text-gray-400 hover:text-white transition-colors">
                          {job.status === 'active' ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white transition-colors">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Connections Tab */}
        {activeTab === 'connections' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Docker */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Database className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Docker</h3>
                    <p className="text-gray-400 text-sm">Conteneurs actifs</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent-green rounded-full" />
                  <span className="text-accent-green text-sm">Connecté</span>
                </div>
              </div>

              <div className="space-y-3">
                {['e-traders-db (PostgreSQL)', 'e-traders-n8n', 'e-traders-redis'].map((container) => (
                  <div key={container} className="flex items-center justify-between p-3 bg-dark-bg/50 rounded-xl">
                    <span className="text-gray-300">{container}</span>
                    <CheckCircle className="w-4 h-4 text-accent-green" />
                  </div>
                ))}
              </div>
            </div>

            {/* Ollama */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Ollama</h3>
                    <p className="text-gray-400 text-sm">Modèles IA</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent-green rounded-full" />
                  <span className="text-accent-green text-sm">Disponible</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-dark-bg/50 rounded-xl">
                  <span className="text-gray-300">llama3.2</span>
                  <span className="text-electron-gold text-sm">Actif</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-dark-bg/50 rounded-xl">
                  <span className="text-gray-300">codellama</span>
                  <span className="text-gray-500 text-sm">Inactif</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-dark-bg/50 rounded-xl">
                  <span className="text-gray-300">mistral</span>
                  <span className="text-gray-500 text-sm">Inactif</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <AgentDetailModal 
          agent={agents.find(a => a.id === selectedAgent)!}
          onClose={() => setSelectedAgent(null)}
        />
      )}
    </div>
  );
}

// Components
function StatCard({ title, value, icon, color }: { title: string; value: string; icon: React.ReactNode; color: string }) {
  return (
    <div className="p-6 bg-dark-card border border-dark-border rounded-2xl">
      <div className="flex items-start justify-between mb-2">
        <span className={color}>{icon}</span>
      </div>
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors",
        active
          ? "bg-dark-card text-electron-gold border-t border-x border-dark-border"
          : "text-gray-400 hover:text-white"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, any> = {
    online: 'bg-accent-green/20 text-accent-green',
    offline: 'bg-gray-500/20 text-gray-500',
    busy: 'bg-electron-gold/20 text-electron-gold',
    error: 'bg-accent-red/20 text-accent-red',
  };

  return (
    <span className={cn("px-2 py-1 rounded-full text-xs font-medium", colors[status])}>
      {status === 'online' ? 'En ligne' : status === 'offline' ? 'Hors ligne' : status === 'busy' ? 'Occupé' : 'Erreur'}
    </span>
  );
}

function JobStatusBadge({ status }: { status: string }) {
  const colors: Record<string, any> = {
    active: 'bg-accent-green/20 text-accent-green',
    paused: 'bg-gray-500/20 text-gray-500',
    error: 'bg-accent-red/20 text-accent-red',
  };

  return (
    <span className={cn("px-2 py-1 rounded-full text-xs font-medium", colors[status])}>
      {status === 'active' ? 'Actif' : status === 'paused' ? 'En pause' : 'Erreur'}
    </span>
  );
}

function AgentDetailModal({ agent, onClose }: { agent: any; onClose: () => void }) {
  const [activeSection, setActiveSection] = useState<'capabilities' | 'instructions' | 'performance'>('capabilities');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-card border border-dark-border rounded-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-dark-card border-b border-dark-border">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{agent.icon}</span>
            <div>
              <h2 className="text-2xl font-bold text-white">{agent.name}</h2>
              <p className="text-gray-400">{agent.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 px-6 border-b border-dark-border">
          {(['capabilities', 'instructions', 'performance'] as const).map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={cn(
                "py-3 px-2 border-b-2 transition-colors",
                activeSection === section
                  ? "border-electron-gold text-electron-gold"
                  : "border-transparent text-gray-400 hover:text-white"
              )}
            >
              {section === 'capabilities' && 'Capacités'}
              {section === 'instructions' && 'Instructions'}
              {section === 'performance' && 'Performance'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          {activeSection === 'capabilities' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agent.capabilities.map((cap: any) => (
                <div
                  key={cap.name}
                  className={cn(
                    "p-4 rounded-xl border",
                    cap.enabled
                      ? "bg-dark-bg/50 border-dark-border"
                      : "bg-dark-bg/20 border-dark-border opacity-50"
                  )}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{cap.icon}</span>
                    <h4 className="font-bold text-white">{cap.name}</h4>
                    {cap.enabled && <CheckCircle className="w-4 h-4 text-accent-green" />}
                  </div>
                  <p className="text-gray-400 text-sm">{cap.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'instructions' && (
            <div className="space-y-4">
              <div className="p-4 bg-dark-bg/50 rounded-xl border border-dark-border">
                <h4 className="font-bold text-white mb-2">Instructions système</h4>
                <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono">
                  {agent.instructions}
                </pre>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-400 text-sm">Connexion: {agent.connection}</span>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'performance' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-dark-bg/50 rounded-xl border border-dark-border text-center">
                <p className="text-gray-400 text-sm mb-1">Tâches complétées</p>
                <p className="text-3xl font-bold text-white">{agent.performance.tasksCompleted}</p>
              </div>
              <div className="p-6 bg-dark-bg/50 rounded-xl border border-dark-border text-center">
                <p className="text-gray-400 text-sm mb-1">Taux de réussite</p>
                <p className="text-3xl font-bold text-accent-green">{agent.performance.successRate}%</p>
              </div>
              <div className="p-6 bg-dark-bg/50 rounded-xl border border-dark-border text-center">
                <p className="text-gray-400 text-sm mb-1">Temps moyen (s)</p>
                <p className="text-3xl font-bold text-electron-gold">{agent.performance.avgResponseTime}s</p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 p-6 bg-dark-card border-t border-dark-border flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-dark-border text-gray-400 rounded-xl hover:text-white transition-colors"
          >
            Fermer
          </button>
          <button className="px-6 py-2 bg-electron-gold text-premium-900 font-semibold rounded-xl hover:bg-electron-goldLight transition-colors"
          >
            Modifier l&apos;agent
          </button>
        </div>
      </div>
    </div>
  );
}