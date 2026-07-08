import { NextResponse } from 'next/server';

// Configuration par défaut des agents
const DEFAULT_AGENT_CONFIGS = {
  'signal-generator': {
    model: 'llama3.2',
    temperature: 0.7,
    maxTokens: 500,
    enabled: true,
  },
  'risk-manager': {
    model: 'llama3.1:8b',
    temperature: 0.3,
    maxTokens: 300,
    enabled: true,
  },
  'market-sentiment': {
    model: 'llama3.2',
    temperature: 0.6,
    maxTokens: 400,
    enabled: true,
  },
  'ai-tutor': {
    model: 'llama3.1:8b',
    temperature: 0.8,
    maxTokens: 800,
    enabled: true,
  },
  'scalping-bot': {
    model: 'qwen2.5-coder:7b',
    temperature: 0.4,
    maxTokens: 200,
    enabled: true,
  },
  'portfolio-tracker': {
    model: 'llama3.2',
    temperature: 0.5,
    maxTokens: 300,
    enabled: true,
  },
  'workflow-automation': {
    model: 'llama3.1:8b',
    temperature: 0.6,
    maxTokens: 400,
    enabled: true,
  },
  'research-assistant': {
    model: 'llama3.2',
    temperature: 0.7,
    maxTokens: 600,
    enabled: false,
  },
};

// Configuration des fondateurs (en production, cela viendrait d'une DB)
const FOUNDERS = [
  { id: 'founder-1', email: 'electron@trading.com', name: 'ELECTRON Founder' },
];

// GET: Obtenir la config des agents et status fondateur
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  // Vérifier si c'est un fondateur
  const isFounder = FOUNDERS.some(f => f.id === userId) || userId === 'admin';

  // Retourner la config des agents
  return NextResponse.json({
    agents: DEFAULT_AGENT_CONFIGS,
    founders: FOUNDERS.map(f => ({ id: f.id, name: f.name })),
    isFounder: isFounder,
    userId: userId,
  });
}

// PUT: Mettre à jour la config d'un agent
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { agentId, config, userId } = body;

    // Vérification simple du fondateur (en production, utiliser JWT/session)
    const isFounder = FOUNDERS.some(f => f.id === userId) || userId === 'admin';

    if (!isFounder) {
      return NextResponse.json(
        { error: 'Accès refusé. Réservé aux fondateurs.' },
        { status: 403 }
      );
    }

    if (!agentId || !config) {
      return NextResponse.json(
        { error: 'Paramètres manquants' },
        { status: 400 }
      );
    }

    // Mise à jour de la config (en production, sauvegarder en DB)
    const updatedConfig = {
      ...DEFAULT_AGENT_CONFIGS,
      [agentId]: {
        ...DEFAULT_AGENT_CONFIGS[agentId as keyof typeof DEFAULT_AGENT_CONFIGS],
        ...config,
      },
    };

    return NextResponse.json({
      success: true,
      agentId: agentId,
      config: updatedConfig[agentId as keyof typeof DEFAULT_AGENT_CONFIGS],
      message: 'Configuration mise à jour',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur de mise à jour' },
      { status: 500 }
    );
  }
}
