// Performance API

import { NextRequest, NextResponse } from 'next/server';

let performance = {
  totalTrades: 156,
  winningTrades: 98,
  losingTrades: 58,
  winRate: 62.8,
  profitFactor: 2.4,
  sharpeRatio: 1.85,
  maxDrawdown: 8.5,
  avgWin: 342,
  avgLoss: 156,
  bestTrade: 2450,
  worstTrade: -380,
  dailyStats: [
    { date: "2024-06-04", pnl: 1250, trades: 12 },
    { date: "2024-06-03", pnl: -320, trades: 8 },
    { date: "2024-06-02", pnl: 890, trades: 15 },
    { date: "2024-06-01", pnl: 1560, trades: 18 },
    { date: "2024-05-31", pnl: 2100, trades: 22 },
  ]
};

export async function GET() {
  return NextResponse.json({ performance });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (body.performance) performance = body.performance;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}