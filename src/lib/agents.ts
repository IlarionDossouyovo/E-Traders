// Agent API utilities
// Ces fonctions permettent de communiquer avec les agents IA

const API_BASE = '/api/agents';

// Envoyer un message à un agent spécifique
export async function chatWithAgent(agentId: string, message: string, model?: string) {
  try {
    const response = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agentId, message, model }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erreur de communication');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur chat agent:', error);
    throw error;
  }
}

// Obtenir les signaux de trading
export async function getTradingSignals(pair?: string, includeAI = false) {
  try {
    const params = new URLSearchParams();
    if (pair) params.set('pair', pair);
    if (includeAI) params.set('ai', 'true');
    
    const response = await fetch(`${API_BASE}/signal?${params}`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des signaux');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur signaux:', error);
    throw error;
  }
}

// Obtenir le profil de risque
export async function getRiskProfile(profile = 'moderate') {
  try {
    const response = await fetch(`${API_BASE}/risk?profile=${profile}`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du profil');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur profil risque:', error);
    throw error;
  }
}

// Calculer la taille de position
export async function calculatePositionSize(
  accountBalance: number,
  riskPercent: number,
  entryPrice: number,
  stopLoss: number,
  profile = 'moderate'
) {
  try {
    const response = await fetch(`${API_BASE}/risk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountBalance,
        riskPercent,
        entryPrice,
        stopLoss,
        profile,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors du calcul');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur calcul position:', error);
    throw error;
  }
}

// Obtenir le sentiment du marché
export async function getMarketSentiment(asset?: string, includeAI = false) {
  try {
    const params = new URLSearchParams();
    if (asset) params.set('asset', asset);
    if (includeAI) params.set('ai', 'true');
    
    const response = await fetch(`${API_BASE}/sentiment?${params}`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du sentiment');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur sentiment:', error);
    throw error;
  }
}

// Obtenir la configuration des agents
export async function getAgentsConfig(userId?: string) {
  try {
    const params = userId ? `?userId=${userId}` : '';
    const response = await fetch(`${API_BASE}/config${params}`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération de la configuration');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur config:', error);
    throw error;
  }
}

// Mettre à jour la configuration d'un agent
export async function updateAgentConfig(agentId: string, config: any, userId: string) {
  try {
    const response = await fetch(`${API_BASE}/config`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agentId, config, userId }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erreur de mise à jour');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur mise à jour:', error);
    throw error;
  }
}

// Tester Ollama
export async function testOllamaConnection() {
  try {
    const response = await fetch('/api/ollama');
    return await response.json();
  } catch (error) {
    console.error('Erreur connexion Ollama:', error);
    return { connected: false, error: 'Erreur de connexion' };
  }
}
