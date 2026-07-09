// E-Traders Trading API - AI Signals

import { NextRequest, NextResponse } from 'next/server';

// In-memory storage (use Redis/PostgreSQL in production)
let signals: any[] = [];
let emergencyStop = false;

const defaultSignals = [
  { id: "1", pair: "EUR/USD", market: "forex", signal: "buy", price: 1.0892, change: 0.12, confidence: 92, rsi: 45, macd: "bullish", trend: "up", timestamp: "Il y a 2 min" },
  { id: "2", pair: "BTC/USDT", market: "crypto", signal: "buy", price: 67430, change: 2.5, confidence: 88, rsi: 55, macd: "bullish", trend: "up", timestamp: "Il y a 1 min" },
  { id: "3", pair: "ETH/USDT", market: "crypto", signal: "buy", price: 3520, change: 1.8, confidence: 85, rsi: 58, macd: "bullish", trend: "up", timestamp: "Il y a 3 min" },
  { id: "4", pair: "AAPL", market: "stocks", signal: "hold", price: 178.50, change: 0.8, confidence: 70, rsi: 50, macd: "neutral", trend: "sideways", timestamp: "Il y a 15 min" },
];

// GET /api/signals - Fetch AI trading signals
export async function GET() {
  const data = signals.length > 0 ? signals : defaultSignals;
  return NextResponse.json({ signals: data });
}

// POST /api/signals - Receive AI signals
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (body.signals) {
      signals = body.signals.map((s: any) => ({
        ...s,
        timestamp: new Date().toISOString()
      }));
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}