import { NextRequest, NextResponse } from 'next/server';

// GET /api/connections - Statut des connexions Docker et Ollama
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const service = searchParams.get('service');
  
  const results: any = {};
  
  // Docker
  if (!service || service === 'docker') {
    results.docker = {
      status: 'available',
      containers: [
        { name: 'e-traders-db', image: 'postgres:16', status: 'running' },
        { name: 'e-traders-n8n', image: 'n8nio/n8n:1.65.0', status: 'running' },
        { name: 'e-traders-redis', image: 'redis:7-alpine', status: 'running' },
      ],
      endpoint: 'http://localhost:2375',
    };
  }
  
  // Ollama
  if (!service || service === 'ollama') {
    try {
      const ollamaResponse = await fetch('http://localhost:11434/api/tags', { method: 'GET' });
      if (ollamaResponse.ok) {
        const data = await ollamaResponse.json();
        results.ollama = {
          status: 'available',
          models: data.models || [],
          endpoint: 'http://localhost:11434',
        };
      } else {
        results.ollama = { status: 'unavailable', error: `HTTP ${ollamaResponse.status}` };
      }
    } catch (error) {
      results.ollama = { status: 'unavailable', error: 'Connection refused' };
    }
  }
  
  const overallStatus = results.docker?.status === 'available' && results.ollama?.status === 'available'
    ? 'all_connected'
    : results.docker?.status === 'available' || results.ollama?.status === 'available'
    ? 'partial'
    : 'disconnected';
  
  return NextResponse.json({ services: results, overall: overallStatus, timestamp: new Date().toISOString() });
}

// POST /api/connections - Tester connexion
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { service, action } = body;
    
    if (service === 'ollama' && action === 'test') {
      try {
        const testResponse = await fetch('http://localhost:11434/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ model: 'llama3.2', prompt: 'Dis "test réussi"', stream: false }),
        });
        
        if (testResponse.ok) {
          const result = await testResponse.json();
          return NextResponse.json({ success: true, service: 'ollama', result: result.response });
        }
        return NextResponse.json({ success: false, service: 'ollama' }, { status: 500 });
      } catch (error) {
        return NextResponse.json({ success: false, service: 'ollama', error: error instanceof Error ? error.message : 'Failed' }, { status: 500 });
      }
    }
    return NextResponse.json({ error: 'Service non supporté' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}