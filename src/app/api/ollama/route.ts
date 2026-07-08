import { NextResponse } from 'next/server';

// Configuration Ollama
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';

// Modèles disponibles
export const AVAILABLE_MODELS = [
  { id: 'llama3.2', name: 'Llama 3.2', size: '2.0 GB', description: 'Dernier modèle Meta - Général' },
  { id: 'llama3.1:8b', name: 'Llama 3.1 8B', size: '4.9 GB', description: 'Modèle Meta - Bonne performance' },
  { id: 'qwen2.5-coder:7b', name: 'Qwen 2.5 Coder', size: '4.7 GB', description: 'Spécialisé code & analyse' },
  { id: 'phi3:mini', name: 'Phi-3 Mini', size: '2.2 GB', description: 'Microsoft - Compact & efficace' },
  { id: 'nomic-embed-text', name: 'Nomic Embed', size: '274 MB', description: 'Pour embeddings & vecteurs' },
];

// GET: Liste des modèles et status
export async function GET() {
  try {
    // Tester connexion Ollama
    const tagsResponse = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!tagsResponse.ok) {
      return NextResponse.json(
        { 
          error: 'Ollama non connecté',
          models: AVAILABLE_MODELS,
          connected: false 
        },
        { status: 503 }
      );
    }

    const ollamaData = await tagsResponse.json();
    const installedModels = ollamaData.models || [];

    // Mapper les modèles installés
    const modelsWithStatus = AVAILABLE_MODELS.map(model => {
      const installed = installedModels.find((m: any) => 
        m.name === model.id || m.name.startsWith(model.id.split(':')[0])
      );
      return {
        ...model,
        installed: !!installed,
        installedSize: installed?.size || null,
      };
    });

    return NextResponse.json({
      connected: true,
      baseUrl: OLLAMA_BASE_URL,
      models: modelsWithStatus,
      installedCount: installedModels.length,
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Erreur connexion Ollama',
        models: AVAILABLE_MODELS,
        connected: false,
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}

// POST: Tester un modèle
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { model, prompt } = body;

    if (!model || !prompt) {
      return NextResponse.json(
        { error: 'Paramètres manquants: model et prompt requis' },
        { status: 400 }
      );
    }

    // Tester génération avec le modèle
    const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: model,
        prompt: prompt,
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
      model: model,
      response: data.response,
      done: data.done,
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Erreur lors du test',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}
