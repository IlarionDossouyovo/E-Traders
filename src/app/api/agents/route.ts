import { NextRequest, NextResponse } from 'next/server';
import { agents, connections } from '@/lib/agents/agent-config';

// GET /api/agents - Liste de tous les agents
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const agentId = searchParams.get('id');
  
  // Retourner un agent spécifique
  if (agentId) {
    const agent = agents.find(a => a.id === agentId);
    if (!agent) {
      return NextResponse.json({ error: 'Agent non trouvé' }, { status: 404 });
    }
    return NextResponse.json(agent);
  }
  
  // Retourner tous les agents
  return NextResponse.json({
    agents,
    connections,
    summary: {
      totalAgents: agents.length,
      activeJobs: agents.reduce((acc, a) => acc + a.jobs.filter(j => j.status === 'active').length, 0),
      avgSuccessRate: agents.reduce((acc, a) => acc + a.performance.successRate, 0) / agents.length,
    }
  });
}

// POST /api/agents - Créer une nouvelle tâche pour un agent
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agentId, action, params } = body;
    
    const agent = agents.find(a => a.id === agentId);
    if (!agent) {
      return NextResponse.json({ error: 'Agent non trouvé' }, { status: 404 });
    }
    
    // Simuler l'exécution de la tâche
    const result = {
      success: true,
      agentId,
      action,
      params,
      timestamp: new Date().toISOString(),
      result: {
        message: `Tâche "${action}" exécutée par ${agent.name}`,
        executionTime: Math.random() * 3,
      }
    };
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de l\'exécution' }, { status: 500 });
  }
}

// PATCH /api/agents - Modifier le statut d'un agent ou job
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { agentId, jobId, status } = body;
    
    const agent = agents.find(a => a.id === agentId);
    if (!agent) {
      return NextResponse.json({ error: 'Agent non trouvé' }, { status: 404 });
    }
    
    // Mettre à jour le statut de l'agent ou d'un job spécifique
    if (jobId) {
      const job = agent.jobs.find(j => j.id === jobId);
      if (job) {
        job.status = status;
      }
    } else {
      agent.status = status;
    }
    
    return NextResponse.json({ success: true, agent });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 });
  }
}