// Configuration des Agents AI Automation 360°
// E-Traders By ELECTRON

export interface AgentCapability {
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
}

export interface AgentJob {
  id: string;
  title: string;
  description: string;
  schedule?: string;
  status: 'active' | 'paused' | 'error';
  lastRun?: string;
  nextRun?: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  model?: string;
  capabilities: AgentCapability[];
  jobs: AgentJob[];
  status: 'online' | 'offline' | 'busy' | 'error';
  connection: 'docker' | 'ollama' | 'both';
  instructions: string;
  createdAt: string;
  performance: {
    tasksCompleted: number;
    successRate: number;
    avgResponseTime: number;
  };
}

// Modèles Ollama
export const ollamaModels = {
  main: 'llama3.1:8b',
  coder: 'qwen2.5-coder:7b',
  fast: 'phi3:mini',
};

// ==================== 12 AGENTS ====================
export const agents: Agent[] = [
  // 1. Signal Generator
  {
    id: 'signal-generator',
    name: 'Signal Generator',
    description: 'Génère des signaux de trading IA basés sur RSI, MACD, et tendances',
    icon: '⚡',
    color: '#FFD700',
    model: 'llama3.1:8b',
    connection: 'ollama',
    capabilities: [
      { name: 'RSI Analysis', description: 'Analyse RSI', icon: '📊', enabled: true },
      { name: 'MACD Detection', description: 'Détection MACD', icon: '📈', enabled: true },
      { name: 'Trend Analysis', description: 'Analyse tendances', icon: '📉', enabled: true },
    ],
    jobs: [
      { id: 'sig-1', title: 'Scan EUR/USD', description: 'Analyser EUR/USD', schedule: '0 * * * *', status: 'active' },
      { id: 'sig-2', title: 'Scan BTC/USDT', description: 'Analyser BTC/USDT', schedule: '30 * * * *', status: 'active' },
    ],
    status: 'online',
    instructions: 'Tu génères des signaux de trading.',
    createdAt: '2024-01-15',
    performance: { tasksCompleted: 1247, successRate: 87.3, avgResponseTime: 2.3 },
  },
  // 2. Risk Manager
  {
    id: 'risk-manager',
    name: 'Risk Manager',
    description: 'Gère les risques avec stop loss, take profit et limites',
    icon: '🛡️',
    color: '#FF6B6B',
    connection: 'docker',
    capabilities: [
      { name: 'Stop Loss', description: 'Gestion stops loss', icon: '🛑', enabled: true },
      { name: 'Take Profit', description: 'Gestion take profit', icon: '💰', enabled: true },
    ],
    jobs: [
      { id: 'risk-1', title: 'Vérification Stops', description: 'Vérifier stops', schedule: '*/5 * * * *', status: 'active' },
    ],
    status: 'online',
    instructions: 'Tu gères les risques de trading.',
    createdAt: '2024-01-15',
    performance: { tasksCompleted: 892, successRate: 99.2, avgResponseTime: 0.5 },
  },
  // 3. Market Sentiment
  {
    id: 'market-sentiment',
    name: 'Market Sentiment',
    description: 'Analyse le sentiment du marché',
    icon: '📰',
    color: '#4ECDC4',
    model: 'llama3.1:8b',
    connection: 'ollama',
    capabilities: [
      { name: 'News Analysis', description: 'Analyse news', icon: '📰', enabled: true },
      { name: 'Social Sentiment', description: 'Sentiment social', icon: '🐦', enabled: true },
    ],
    jobs: [
      { id: 'sent-1', title: 'News Crypto', description: 'Analyser news', schedule: '*/15 * * * *', status: 'active' },
    ],
    status: 'online',
    instructions: 'Tu analyses le sentiment.',
    createdAt: '2024-01-15',
    performance: { tasksCompleted: 2156, successRate: 78.5, avgResponseTime: 3.2 },
  },
  // 4. AI Tutor
  {
    id: 'ai-tutor',
    name: 'AI Tutor',
    description: 'Tuteur IA pour apprendre le trading',
    icon: '🎓',
    color: '#9B59B6',
    model: 'llama3.1:8b',
    connection: 'ollama',
    capabilities: [
      { name: 'Cours Interactifs', description: 'Cours interactifs', icon: '📚', enabled: true },
      { name: 'Paper Trading', description: 'Simulateur', icon: '💵', enabled: true },
    ],
    jobs: [
      { id: 'tutor-1', title: 'Cours Scalping', description: 'Cours scalping', schedule: undefined, status: 'active' },
    ],
    status: 'online',
    instructions: 'Tu es le tuteur IA.',
    createdAt: '2024-01-15',
    performance: { tasksCompleted: 567, successRate: 95.8, avgResponseTime: 4.5 },
  },
  // 5. Scalping Bot
  {
    id: 'scalping-bot',
    name: 'Scalping Bot',
    description: 'Bot de trading automatique scalping',
    icon: '⚔️',
    color: '#E74C3C',
    model: 'llama3.1:8b',
    connection: 'ollama',
    capabilities: [
      { name: 'Quick Trades', description: 'Trades rapides', icon: '🚀', enabled: true },
      { name: 'Micro Scalp', description: 'Micro scalp', icon: '🎯', enabled: true },
    ],
    jobs: [
      { id: 'scalp-1', title: 'Scalp EUR/USD', description: 'Scalp EUR/USD', schedule: '0 14-22 * * 1-5', status: 'active' },
    ],
    status: 'online',
    instructions: 'Tu es le bot de scalping.',
    createdAt: '2024-01-15',
    performance: { tasksCompleted: 3421, successRate: 82.1, avgResponseTime: 1.2 },
  },
  // 6. Portfolio Tracker
  {
    id: 'portfolio-tracker',
    name: 'Portfolio Tracker',
    description: 'Suivi du portefeuille en temps réel',
    icon: '💼',
    color: '#F39C12',
    connection: 'docker',
    capabilities: [
      { name: 'Real-time', description: 'Temps réel', icon: '📊', enabled: true },
      { name: 'Allocation', description: 'Allocation', icon: '🥧', enabled: true },
    ],
    jobs: [
      { id: 'port-1', title: 'Update P&L', description: 'Mettre à jour P&L', schedule: '*/5 * * * *', status: 'active' },
    ],
    status: 'online',
    instructions: 'Tu suis le portefeuille.',
    createdAt: '2024-01-15',
    performance: { tasksCompleted: 15678, successRate: 100, avgResponseTime: 0.3 },
  },
  // 7. News Analyst
  {
    id: 'news-analyst',
    name: 'News Analyst',
    description: 'Analyse les actualités financières',
    icon: '📰',
    color: '#E74C3C',
    model: 'llama3.1:8b',
    connection: 'ollama',
    capabilities: [
      { name: 'Breaking News', description: 'Breaking news', icon: '🚨', enabled: true },
      { name: 'Impact Analysis', description: 'Analyse impact', icon: '💥', enabled: true },
    ],
    jobs: [
      { id: 'news-1', title: 'Scan Crypto News', description: 'Analyser crypto', schedule: '*/10 * * * *', status: 'active' },
    ],
    status: 'online',
    instructions: 'Tu analises les actualités.',
    createdAt: '2024-01-15',
    performance: { tasksCompleted: 500, successRate: 85, avgResponseTime: 2.0 },
  },
  // 8. Crypto Analyst
  {
    id: 'crypto-analyst',
    name: 'Crypto Analyst',
    description: 'Analyse spécialisé crypto',
    icon: '₿',
    color: '#F7931A',
    model: 'llama3.1:8b',
    connection: 'ollama',
    capabilities: [
      { name: 'On-Chain', description: 'Données blockchain', icon: '⛓️', enabled: true },
      { name: 'TVL Analysis', description: 'TVL', icon: '🔒', enabled: true },
    ],
    jobs: [
      { id: 'crypto-1', title: 'BTC Analysis', description: 'Analyser BTC', schedule: '*/30 * * * *', status: 'active' },
    ],
    status: 'online',
    instructions: 'Tu analises les cryptos.',
    createdAt: '2024-01-15',
    performance: { tasksCompleted: 800, successRate: 82, avgResponseTime: 2.5 },
  },
  // 9. Forex Analyst
  {
    id: 'forex-analyst',
    name: 'Forex Analyst',
    description: 'Analyse des paires forex',
    icon: '💱',
    color: '#27AE60',
    model: 'llama3.1:8b',
    connection: 'ollama',
    capabilities: [
      { name: 'Majors', description: 'Paires majeures', icon: '⭐', enabled: true },
    ],
    jobs: [
      { id: 'forex-1', title: 'EUR/USD', description: 'EUR/USD', schedule: '*/15 * * * *', status: 'active' },
    ],
    status: 'online',
    instructions: 'Tu analises le forex.',
    createdAt: '2024-01-15',
    performance: { tasksCompleted: 1200, successRate: 88, avgResponseTime: 1.8 },
  },
  // 10. Pattern Scanner
  {
    id: 'pattern-scanner',
    name: 'Pattern Scanner',
    description: 'Reconnaissance des patterns',
    icon: '📈',
    color: '#9B59B6',
    model: 'llama3.1:8b',
    connection: 'ollama',
    capabilities: [
      { name: 'Chart Patterns', description: 'Figures chartistes', icon: '📊', enabled: true },
    ],
    jobs: [
      { id: 'pattern-1', title: 'Scan Patterns', description: 'Scanner', schedule: '*/5 * * * *', status: 'active' },
    ],
    status: 'online',
    instructions: 'Tu scannes les patterns.',
    createdAt: '2024-01-15',
    performance: { tasksCompleted: 3000, successRate: 75, avgResponseTime: 1.5 },
  },
  // 11. Backtester
  {
    id: 'backtester',
    name: 'Backtester',
    description: 'Test des stratégies historiques',
    icon: '🔬',
    color: '#34495E',
    model: 'qwen2.5-coder:7b',
    connection: 'ollama',
    capabilities: [
      { name: 'Strategy Test', description: 'Test stratégies', icon: '🧪', enabled: true },
    ],
    jobs: [
      { id: 'backtest-1', title: 'Daily Backtest', description: 'Backtest', schedule: '0 1 * * *', status: 'active' },
    ],
    status: 'online',
    instructions: 'Tu fais du backtesting.',
    createdAt: '2024-01-15',
    performance: { tasksCompleted: 150, successRate: 90, avgResponseTime: 30.0 },
  },
  // 12. Alert System
  {
    id: 'alert-system',
    name: 'Alert System',
    description: "Système d'alertes",
    icon: '🔔',
    color: '#E67E22',
    model: 'phi3:mini',
    connection: 'ollama',
    capabilities: [
      { name: 'Price Alerts', description: 'Alertes prix', icon: '💰', enabled: true },
    ],
    jobs: [
      { id: 'alert-1', title: 'Price Monitor', description: 'Surveiller', schedule: '*/1 * * * *', status: 'active' },
    ],
    status: 'online',
    instructions: 'Tu gères les alertes.',
    createdAt: '2024-01-15',
    performance: { tasksCompleted: 5000, successRate: 99, avgResponseTime: 0.1 },
  },
];

// Connexions
export const connections = {
  docker: {
    status: 'connected',
    endpoint: 'http://localhost:2375',
  },
  ollama: {
    status: 'available',
    endpoint: 'http://localhost:11434',
  },
};

export function isFounder(userId: string): boolean {
  const founderIds = ['founder-001', 'admin-001'];
  return founderIds.includes(userId);
}