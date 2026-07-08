import { NextResponse } from 'next/server';

// Données de marché simulées
const MARKET_DATA = {
  'EUR/USD': { price: 1.0892, rsi: 45, macd: 'bullish', trend: 'up', change: 0.12 },
  'GBP/USD': { price: 1.2670, rsi: 52, macd: 'neutral', trend: 'sideways', change: -0.05 },
  'USD/JPY': { price: 156.85, rsi: 68, macd: 'bearish', trend: 'down', change: 0.08 },
  'BTC/USDT': { price: 67430, rsi: 55, macd: 'bullish', trend: 'up', change: 2.5 },
  'ETH/USDT': { price: 3520, rsi: 58, macd: 'bullish', trend: 'up', change: 1.8 },
  'SOL/USDT': { price: 145.20, rsi: 75, macd: 'bearish', trend: 'up', change: 5.2 },
  'AAPL': { price: 178.50, rsi: 50, macd: 'neutral', trend: 'sideways', change: 0.8 },
  'NVDA': { price: 875.30, rsi: 42, macd: 'bullish', trend: 'up', change: 1.5 },
  'TSLA': { price: 175.40, rsi: 72, macd: 'bearish', trend: 'down', change: -1.2 },
};

// GET: Obtenir les signaux de trading
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pair = searchParams.get('pair');
  const includeAI = searchParams.get('ai') === 'true';

  try {
    // Si une paire spécifique est demandée
    if (pair) {
      const data = MARKET_DATA[pair as keyof typeof MARKET_DATA];
      if (!data) {
        return NextResponse.json(
          { error: `Paire non trouvée: ${pair}` },
          { status: 404 }
        );
      }

      // Générer le signal basé sur les indicateurs
      const signal = generateSignal(data);
      
      // Si demande d'analyse IA
      let aiAnalysis = null;
      if (includeAI) {
        aiAnalysis = await generateAIAnalysis(pair, data, signal);
      }

      return NextResponse.json({
        pair,
        ...data,
        signal,
        aiAnalysis,
        timestamp: new Date().toISOString(),
      });
    }

    // Retourner tous les signaux
    const signals = Object.entries(MARKET_DATA).map(([pair, data]) => ({
      pair,
      ...data,
      signal: generateSignal(data),
    }));

    return NextResponse.json({
      signals,
      count: signals.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la génération des signaux' },
      { status: 500 }
    );
  }
}

// Fonction pour générer le signal
function generateSignal(data: any): string {
  let score = 0;

  // RSI
  if (data.rsi < 30) score += 2;
  else if (data.rsi > 70) score -= 2;
  else if (data.rsi < 40) score += 1;
  else if (data.rsi > 60) score -= 1;

  // MACD
  if (data.macd === 'bullish') score += 1;
  else if (data.macd === 'bearish') score -= 1;

  // Trend
  if (data.trend === 'up') score += 1;
  else if (data.trend === 'down') score -= 1;

  if (score >= 2) return 'ACHETER';
  if (score <= -2) return 'VENDRE';
  return 'CONSERVER';
}

// Fonction pour générer l'analyse IA
async function generateAIAnalysis(pair: string, data: any, signal: string): Promise<string> {
  const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
  
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2',
        messages: [
          { 
            role: 'system', 
            content: 'Tu es un expert en trading. Analyse les données techniques et fournis une recommandation concise.' 
          },
          { 
            role: 'user', 
            content: `Analyse ${pair}: Prix=${data.price}, RSI=${data.rsi}, MACD=${data.macd}, Trend=${data.trend}, Signal=${signal}. Donne une analyse courte en français.'`
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
