// Portfolio API

import { NextRequest, NextResponse } from 'next/server';

let portfolio = {
  totalBalance: 125430,
  availableBalance: 98250,
  investedBalance: 27180,
  pnl: 8420,
  pnlPercent: 7.21,
  holdings: [
    { symbol: "BTC", amount: 0.5, value: 33715, pnl: 4215, pnlPercent: 14.3 },
    { symbol: "ETH", amount: 3.2, value: 10560, pnl: 1580, pnlPercent: 17.6 },
    { symbol: "EUR/USD", amount: 10000, value: 10892, pnl: 892, pnlPercent: 8.9 },
    { symbol: "AAPL", amount: 50, value: 8925, pnl: 925, pnlPercent: 11.6 },
  ],
  allocation: { crypto: 35, forex: 30, stocks: 25, other: 10 }
};

export async function GET() {
  return NextResponse.json({ portfolio });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (body.holdings) portfolio.holdings = body.holdings;
    return NextResponse.json({ success: true, portfolio });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}