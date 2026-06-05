// Sentiment API

import { NextRequest, NextResponse } from 'next/server';

let sentiment: any = {
  overall: 65,
  timestamp: new Date().toISOString()
};

export async function GET() {
  return NextResponse.json({ sentiment });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    sentiment = { ...body, timestamp: new Date().toISOString() };
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}