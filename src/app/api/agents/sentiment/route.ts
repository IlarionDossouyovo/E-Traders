import { NextResponse } from 'next/server';

// Données de sentiment simulées
const SENTIMENT_DATA = [
  { id: '1', title: 'La Fed maintient ses taux inchangés', source: 'Reuters', time: 'Il y a 1h', sentiment: 'positive', impact: 'high' },
  { id: '2', title: 'Bitcoin dépasse les $67,000 après l\'annonce ETF', source: 'CoinDesk', time: 'Il y a 2h', sentiment: 'positive', impact: 'high' },
  { id: '3', title: 'Tensions géopolitiques en Moyen-Orient', source: 'Bloomberg', time: 'Il y a 3h', sentiment: 'negative', impact: 'high' },
  { id: '4', title: 'Apple lance de nouveaux produits', source: 'TechCrunch', time: 'Il y a 4h', sentiment: 'positive', impact: 'medium' },
  { id: '5', title: 'Le dollar faiblesse après les données économiques', source: 'FXStreet', time: 'Il y a 5h', sentiment: 'negative', impact: 'medium' },
];

// GET: Obtenir le sentiment du marché
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const asset = searchParams.get('asset');
  const includeAI = searchParams.get('ai') === 'true';

  try {
    // Filtrer par actif si spécifié
    let news = SENTIMENT_DATA;
    if (asset) {
      // Simulation de filtrage
      news = SENTIMENT_DATA.filter(n => 
        n.title.toLowerCase().includes(asset.toLowerCase()) ||
        asset.toLowerCase().includes('crypto') && n.title.includes('Bitcoin')
      );
    }

    // Calculer le sentiment global
    const sentimentCounts = {
      positive: news.filter(n => n.sentiment === 'positive').length,
      negative: news.filter(n => n.sentiment === 'negative').length,
      neutral: news.filter(n => n.sentiment === 'neutral').length,
    };

    const total = sentimentCounts.positive + sentimentCounts.negative + sentimentCounts.neutral;
    const sentimentScore = ((sentimentCounts.positive - sentimentCounts.negative) / total * 100).toFixed(1);
    
    let overallSentiment = 'neutre';
    if (parseFloat(sentimentScore) > 10) overallSentiment = 'haussier';
    else if (parseFloat(sentimentScore) < -10) overallSentiment = 'baissier';

    // Analyse IA
    let aiAnalysis = null;
    if (includeAI) {
      aiAnalysis = await generateAIAnalysis(news, overallSentiment);
    }

    return NextResponse.json({
      news,
      sentiment: {
        overall: overallSentiment,
        score: parseFloat(sentimentScore),
        breakdown: sentimentCounts,
      },
      aiAnalysis,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de l\'analyse du sentiment' },
      { status: 500 }
    );
  }
}

// Fonction pour générer l'analyse IA
async function generateAIAnalysis(news: any[], sentiment: string): Promise<string> {
  const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
  
  try {
    const newsSummary = news.slice(0, 3).map(n => n.title).join(', ');
    
    const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2',
        messages: [
          { 
            role: 'system', 
            content: 'Tu es un analyste de sentiment de marché. Résume les nouvelles et donne ton avis sur le sentiment global.' 
          },
          { 
            role: 'user', 
            content: `Analyse ce sentiment de marché: ${newsSummary}. Sentiment actuel: ${sentiment}. Donne une analyse courte en français.'
          }
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      return 'Analyse IA non disponible';
    }

    const result = await response.json();
    return result.message?.content || result.response || 'Analyse non disponible';
  } catch (error) {
    return 'Connexion IA non disponible';
  }
}
