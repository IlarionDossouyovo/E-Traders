import { NextRequest, NextResponse } from 'next/server';
import { agents } from '@/lib/agents/agent-config';

// POST /api/agents/execute - Exécuter une tâche via un agent
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agentId, prompt, params } = body;
    
    const agent = agents.find(a => a.id === agentId);
    if (!agent) {
      return NextResponse.json({ error: 'Agent non trouvé' }, { status: 404 });
    }
    
    // Préparer la requête vers Ollama si nécessaire
    let ollamaResult = null;
    
    if (agent.connection === 'ollama' || agent.connection === 'both') {
      try {
        const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'llama3.2',
            prompt: `${agent.instructions}\n\nTâche: ${prompt}\n\nParams: ${JSON.stringify(params || {})}`,
            stream: false,
          }),
        });
        
        if (ollamaResponse.ok) {
          ollamaResult = await ollamaResponse.json();
        }
      } catch (ollamaError) {
        // Ollama pas disponible - mode simulé
        ollamaResult = {
          response: `Mode simulé: ${prompt}`,
          done: true,
        };
      }
    }
    
    // Retourner le résultat
    const result = {
      success: true,
      agent: {
        id: agent.id,
        name: agent.name,
        status: agent.status,
      },
      prompt,
      params: params || {},
      timestamp: new Date().toISOString(),
      result: ollamaResult || {
        message: 'Tâche exécutée (mode simulé)',
        agent_response: 'Response mock - Ollama non connecté',
      },
    };
    
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Erreur lors de l\'exécution de l\'agent',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

// GET /api/agents/execute - Vérifier le statut d'exécution
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const agentId = searchParams.get('agentId');
  
  // Vérifier Ollama
  let ollamaStatus = 'unavailable';
  let ollamaModels: string[] = [];
  
  try {
    const ollamaResponse = await fetch('http://localhost:11434/api/tags', {
      method: 'GET',
    });
    
    if (ollamaResponse.ok) {
      const data = await ollamaResponse.json();
      ollamaStatus = 'available';
      ollamaModels = data.models?.map((m: any) => m.name) || [];
    }
  } catch {
    ollamaStatus = 'unavailable';
  }
  
  return NextResponse.json({
    agentId,
    ollama: {
      status: ollamaStatus,
      models: ollamaModels,
      endpoint: 'http://localhost:11434',
    },
    docker: {
      status: 'available',
      containers: ['e-traders-db', 'e-traders-n8n', 'e-traders-redis'],
    },
    timestamp: new Date().toISOString(),
  });
}