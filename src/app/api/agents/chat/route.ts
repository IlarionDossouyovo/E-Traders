import { NextResponse } from 'next/server';

// Configuration Ollama
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';

// Prompts système pour chaque agent
const AGENT_PROMPTS: Record<string, string> = {
  'signal-generator': `Tu es un expert en analyse technique financière. Tu génères des signaux de trading précis basés sur RSI, MACD, Bollinger Bands, et autres indicateurs. Réponds en français avec des recommandations claires: ACHETER, VENDRE, ou CONSERVER.`,
  
  'risk-manager': `Tu es un expert en gestion des risques financiers. Ton rôle est de protéger le portefeuille contre les pertes excessives. Analyse les positions et suggère des stop-loss, taille de position, et diversification. Réponds en français de manière concise.`,
  
  'market-sentiment': `Tu es un analyste de sentiment de marché. Tu analyses les nouvelles financières, les réseaux sociaux, et les données on-chain pour déterminer le sentiment global du marché. Réponds en français avec une analyse claire.`,
  
  'ai-tutor': `Tu es un tuteur pédagogique en trading et finance. Tu expliques les concepts de manière simple et adaptative selon le niveau de l'utilisateur. Réponds en français de manière éducative et patiente.`,
  
  'scalping-bot': `Tu es un expert en scalping trading. Tu donnes des conseils pour le trading à haute fréquence, les points d'entrée/sortie, et la gestion des micro-mouvements. Réponds en français de manière technique.`,
  
  'portfolio-tracker': `Tu es un analyste de portefeuille. Tu suis les performances, calcule le P&L, et suggères des réallocations. Réponds en français avec des données précises.`,
  
  'workflow-automation': `Tu es un expert en automatisation de workflows. Tu帮助创建和优化自动化交易流程。Réponds en français.`,
  
  'research-assistant': `Tu es un assistant de recherche en investissement. Tu effectues des analyses fondamentales et cherches des opportunités d'investissement. Réponds en français de manière professionnelle.`,
};

// POST: Envoyer un message à un agent
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { agentId, message, model } = body;

    if (!agentId || !message) {
      return NextResponse.json(
        { error: 'Paramètres manquants: agentId et message requis' },
        { status: 400 }
      );
    }

    // Vérifier que l'agent existe
    if (!AGENT_PROMPTS[agentId]) {
      return NextResponse.json(
        { error: `Agent inconnu: ${agentId}` },
        { status: 400 }
      );
    }

    // Modèle par défaut ou personnalisé
    const selectedModel = model || 'llama3.2';

    // Appel Ollama
    const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: selectedModel,
        messages: [
          { role: 'system', content: AGENT_PROMPTS[agentId] },
          { role: 'user', content: message }
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error: `Erreur Ollama: ${error}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      agent: agentId,
      model: selectedModel,
      response: data.message?.content || data.response,
      done: data.done,
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Erreur lors de la communication avec l\'agent',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}

// GET: Liste des agents disponibles
export async function GET() {
  const agents = Object.entries(AGENT_PROMPTS).map(([id, prompt]) => ({
    id,
    name: id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    description: prompt.substring(0, 100) + '...',
  }));

  return NextResponse.json({
    agents,
    available: true,
  });
}
