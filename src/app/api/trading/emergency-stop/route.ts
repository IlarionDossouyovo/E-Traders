// Trading Emergency Stop API

import { NextRequest, NextResponse } from 'next/server';

let emergencyStop = false;

export async function GET() {
  return NextResponse.json({ emergencyStop });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (body.emergency_stop !== undefined) {
      emergencyStop = body.emergency_stop;
    }
    
    return NextResponse.json({ 
      success: true, 
      emergencyStop,
      message: emergencyStop ? 'All trading halted' : 'Trading active'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}