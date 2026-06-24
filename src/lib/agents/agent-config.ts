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

// Liste des Agents AI Automation 360°
export const agents: Agent[] = [
  {
    id: 'signal-generator',
    name: 'Signal Generator',
    description: 'Génère des signaux de trading IA basés sur RSI, MACD, et tendances du marché',
    icon: '⚡',
    color: '#FFD700',
    capabilities: [
      { name: 'RSI Analysis', description: 'Analyse Relative Strength Index', icon: '📊', enabled: true },
      { name: 'MACD Detection', description: 'Détection de convergences MACD', icon: '📈', enabled: true },
      { name: 'Trend Analysis', description: 'Analyse des tendances haussières/bassières', icon: '📉', enabled: true },
      { name: 'Pattern Recognition', description: 'Reconnaissance des figures chartistes', icon: '🔍', enabled: true },
    ],
    jobs: [
      { id: 'sig-1', title: 'Scan EUR/USD', description: 'Analyser les signaux EUR/USD chaque heure', schedule: '0 * * * *', status: 'active' },
      { id: 'sig-2', title: 'Scan BTC/USDT', description: 'Analyser les signaux BTC/USDT chaque heure', schedule: '30 * * * *', status: 'active' },
      { id: 'sig-3', title: 'Scan Actions US', description: 'Analyser les actions américaines', schedule: '0 9,15 * * 1-5', status: 'active' },
    ],
    status: 'online',
    connection: 'ollama',
    instructions: `Tu es un expert en analyse technique financière. Ton rôle est de:
1. Analyser les paires de devises et cryptomonnaies
2. Calculer les indicateurs RSI, MACD, moyennes mobiles
3. Détecter les signaux d'achat/vente avec niveau de confiance
4. Générer des recommandations de trading précises

Utilise le modèle Ollama local pour l'analyse. Retourne un JSON avec:
- pair: la paire analysée
- signal: "buy" | "sell" | "hold"
- confidence: score de confiance 0-100%
- entry: prix d'entrée suggéré
- stop_loss: prix de stop loss
- take_profit: prix de take profit
- reasoning: explication de l'analyse`,
    createdAt: '2024-01-15',
    performance: { tasksCompleted: 1247, successRate: 87.3, avgResponseTime: 2.3 },
  },
  {
    id: 'risk-manager',
    name: 'Risk Manager',
    description: 'Gère les risques de trading avec stop loss, take profit et limites de position',
    icon: '🛡️',
    color: '#FF6B6B',
    capabilities: [
      { name: 'Stop Loss', description: 'Gestion des stops loss dynamiques', icon: '🛑', enabled: true },
      { name: 'Take Profit', description: 'Gestion des take profit partiels', icon: '💰', enabled: true },
      { name: 'Position Sizing', description: 'Calcul de la taille des positions', icon: '📏', enabled: true },
      { name: 'Risk Limits', description: 'Limites de risque par trade', icon: '⚠️', enabled: true },
    ],
    jobs: [
      { id: 'risk-1', title: 'Vérification Stops', description: 'Vérifier les stops loss actifs', schedule: '*/5 * * * *', status: 'active' },
      { id: 'risk-2', title: 'Calc Exposition', description: 'Calculer exposition par devise', schedule: '0 */2 * * *', status: 'active' },
    ],
    status: 'online',
    connection: 'docker',
    instructions: `Tu es le gestionnaire de risque du système de trading. Ton rôle est de:
1. Surveiller les positions ouvertes
2. Vérifier que les stops loss sont respectés
3. Calculer l'exposition totale par paire
4. Bloquer les trades qui dépassent les limites de risque
5. Gérer le drawdown maximum

Règles de risque à appliquer:
- Risque max par trade: 2% du capital
- Exposition max par devise: 10% du capital
- Drawdown max: 15% → stop total
- Levier max: 10x

Retourne un JSON avec:
- action: "allow" | "block" | "modify"
- reason: explication
- suggested_modifications: modifications suggérées si applicable`,
    createdAt: '2024-01-15',
    performance: { tasksCompleted: 892, successRate: 99.2, avgResponseTime: 0.5 },
  },
  {
    id: 'market-sentiment',
    name: 'Market Sentiment',
    description: 'Analyse le sentiment du marché via news, réseaux sociaux et données on-chain',
    icon: '📰',
    color: '#4ECDC4',
    capabilities: [
      { name: 'News Analysis', description: 'Analyse des actualités financières', icon: '📰', enabled: true },
      { name: 'Social Sentiment', description: 'Analyse sentiment Twitter/Reddit', icon: '🐦', enabled: true },
      { name: 'On-Chain Data', description: 'Données blockchain (BTC, ETH)', icon: '⛓️', enabled: true },
      { name: 'Economic Calendar', description: 'Calendrier économique', icon: '📅', enabled: true },
    ],
    jobs: [
      { id: 'sent-1', title: 'News Crypto', description: 'Analyser les news crypto', schedule: '*/15 * * * *', status: 'active' },
      { id: 'sent-2', title: 'Sentiment Social', description: 'Analyser le sentiment réseaux sociaux', schedule: '*/30 * * * *', status: 'active' },
      { id: 'sent-3', title: 'Economic Events', description: 'Surveiller les événements économiques', schedule: '0 8,12,17 * * 1-5', status: 'active' },
    ],
    status: 'online',
    connection: 'ollama',
    instructions: `Tu es l'analyste du sentiment de marché. Ton rôle est de:
1. Analyser les actualités financières
2. Mesurer le sentiment sur les réseaux sociaux
3. Surveiller les données on-chain (BTC, ETH)
4. Identifier les événements à fort impact

Retourne un JSON avec:
- overall_sentiment: "bullish" | "bearish" | "neutral"
- sentiment_score: -100 à +100
- key_news: tableau des 3 principales news
- market_impact: estimation d'impact
- recommended_actions: actions suggérées`,
    createdAt: '2024-01-15',
    performance: { tasksCompleted: 2156, successRate: 78.5, avgResponseTime: 3.2 },
  },
  {
    id: 'ai-tutor',
    name: 'AI Tutor',
    description: 'Tuteur IA pour apprendre le trading, le scalping et l\'algo trading',
    icon: '🎓',
    color: '#9B59B6',
    capabilities: [
      { name: 'Cours Interactifs', description: 'Cours de trading interactifs', icon: '📚', enabled: true },
      { name: 'Paper Trading', description: 'Simulateur paper trading $100k', icon: '💵', enabled: true },
      { name: 'Quiz', description: 'Quiz d\'évaluation', icon: '❓', enabled: true },
      { name: 'Stratégies', description: 'Explication des stratégies', icon: '♟️', enabled: true },
    ],
    jobs: [
      { id: 'tutor-1', title: 'Cours Scalping', description: 'Cours de scalping avancé', schedule: undefined, status: 'active' },
      { id: 'tutor-2', title: 'Cours Swing', description: 'Cours de swing trading', schedule: undefined, status: 'active' },
      { id: 'tutor-3', title: 'Cours Algo', description: 'Cours d\'algo trading', schedule: undefined, status: 'active' },
    ],
    status: 'online',
    connection: 'ollama',
    instructions: `Tu es le tuteur IA pour l'apprentissage du trading. Ton rôle est de:
1. Enseigner les concepts du trading (scalping, swing, algo)
2. Répondre aux questions des utilisateurs
3. Proposer des exercices pratiques
4. Évaluer les connaissances via des quiz
5. Simuler des trades en mode paper trading

Style pédagogique:
- Commence par les bases, progresse vers l'avancé
- Utilise des exemples concrets
- Encourage la pratique sur papier avant réel
- Explique toujours le "pourquoi"

Tu as accès à un compte paper trading de $100,000 pour les exercices.`,
    createdAt: '2024-01-15',
    performance: { tasksCompleted: 567, successRate: 95.8, avgResponseTime: 4.5 },
  },
  {
    id: 'scalping-bot',
    name: 'Scalping Bot',
    description: 'Bot de trading automatique en mode scalping avec haute fréquence',
    icon: '⚔️',
    color: '#E74C3C',
    capabilities: [
      { name: 'Quick Entries', description: 'Entrées rapides sur signaux forts', icon: '🚀', enabled: true },
      { name: 'Micro Targets', description: 'Cibles micro (5-15 pips)', icon: '🎯', enabled: true },
      { name: 'Fast Exits', description: 'Sorties rapides sur против', icon: '🏃', enabled: true },
      { name: 'Grid Trading', description: 'Trading par grille', icon: '🔲', enabled: true },
    ],
    jobs: [
      { id: 'scalp-1', title: 'Scalp EUR/USD', description: 'Scalping EUR/USD en session US', schedule: '0 14-22 * * 1-5', status: 'active' },
      { id: 'scalp-2', title: 'Scalp GBP/USD', description: 'Scalping GBP/USD en session US', schedule: '0 14-22 * * 1-5', status: 'active' },
      { id: 'scalp-3', title: 'Scalp USD/JPY', description: 'Scalping USD/JPY en session Asia', schedule: '0 0-6 * * 1-5', status: 'active' },
    ],
    status: 'online',
    connection: 'both',
    instructions: `Tu es le bot de scalping automatique. Ton rôle est de:
1. Repérer les opportunités de scalping (TF 1-15min)
2. Entrer rapidement sur signaux forts (RSI<30 ou RSI>70)
3. Cible 5-15 pips par trade
4. Stop loss serré (10 pips max)
5. Sortie rapide si contrepartie

Paramètres de trading:
- Timeframe: 1-15 minutes
- Take profit: 5-15 pips
- Stop loss: 10 pips max
- Taille position: 0.5-2% du capital
- Sessions: US (14h-22h) et Asia (0h-6h)

⚠️ Tu dois IMPÉRATIVEMENT consulter le Risk Manager avant chaque trade!`,
    createdAt: '2024-01-15',
    performance: { tasksCompleted: 3421, successRate: 82.1, avgResponseTime: 1.2 },
  },
  {
    id: 'portfolio-tracker',
    name: 'Portfolio Tracker',
    description: 'Suivi du portefeuille en temps réel avec P&L et allocation',
    icon: '💼',
    color: '#3498DB',
    capabilities: [
      { name: 'Real-time P&L', description: 'P&L en temps réel', icon: '📊', enabled: true },
      { name: 'Allocation', description: 'Allocation du portefeuille', icon: '🥧', enabled: true },
      { name: 'History', description: 'Historique des trades', icon: '📜', enabled: true },
      { name: 'Reports', description: 'Rapports de performance', icon: '📑', enabled: true },
    ],
    jobs: [
      { id: 'port-1', title: 'Update P&L', description: 'Mettre à jour le P&L', schedule: '*/5 * * * *', status: 'active' },
      { id: 'port-2', title: 'Rebalance', description: 'Rééquilibrer le portefeuille', schedule: '0 18 * * 5', status: 'active' },
      { id: 'port-3', title: 'Weekly Report', description: 'Générer le rapport hebdomadaire', schedule: '0 19 * * 5', status: 'active' },
    ],
    status: 'online',
    connection: 'docker',
    instructions: `Tu es le gestionnaire de portefeuille. Ton rôle est de:
1. Suivre les positions ouvertes en temps réel
2. Calculer le P&L par position et global
3. Analyser l'allocation du portefeuille
4. Générer des rapports de performance
5. Rééquilibrer si nécessaire

Métriques à suivre:
- P&L journalier, hebdomadaire, mensuel
- Win rate par stratégie
- Drawdown maximum
- Sharpe ratio (si possible)
- Exposition par devise/marché

Retourne un JSON avec:
- total_value: valeur totale du portefeuille
- pnl: P&L en dollars et pourcents
- positions: tableau des positions
- allocation: breakdown par actif`,
    createdAt: '2024-01-15',
    performance: { tasksCompleted: 15678, successRate: 100, avgResponseTime: 0.3 },
  },
];

// Configuration de connexion
export const connections = {
  docker: {
    status: 'connected',
    endpoint: 'http://localhost:2375',
    containers: ['e-traders-db', 'e-traders-n8n', 'e-traders-redis'],
  },
  ollama: {
    status: 'available',
    endpoint: 'http://localhost:11434',
    model: 'llama3.2',
    availableModels: ['llama3.2', 'codellama', 'mistral'],
  },
};

// Vérification si l'utilisateur est le fondateur
export function isFounder(userId: string): boolean {
  // Liste des IDs autorisés (à configurer)
  const founderIds = ['founder-001', 'admin-001'];
  return founderIds.includes(userId);
}