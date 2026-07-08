import { NextResponse } from 'next/server';

// Types de risque
interface RiskProfile {
  maxPositionSize: number;
  maxDailyLoss: number;
  stopLossDefault: number;
  takeProfitDefault: number;
  maxOpenPositions: number;
}

interface Position {
  id: string;
  pair: string;
  type: 'long' | 'short';
  entryPrice: number;
  currentPrice: number;
  size: number;
  stopLoss?: number;
  takeProfit?: number;
  pnl: number;
  pnlPercent: number;
}

// Profils de risque prédéfinis
const RISK_PROFILES: Record<string, RiskProfile> = {
  conservative: {
    maxPositionSize: 1000,
    maxDailyLoss: 50,
    stopLossDefault: 1.0,
    takeProfitDefault: 1.5,
    maxOpenPositions: 3,
  },
  moderate: {
    maxPositionSize: 5000,
    maxDailyLoss: 200,
    stopLossDefault: 2.0,
    takeProfitDefault: 3.0,
    maxOpenPositions: 5,
  },
  aggressive: {
    maxPositionSize: 10000,
    maxDailyLoss: 500,
    stopLossDefault: 3.0,
    takeProfitDefault: 5.0,
    maxOpenPositions: 10,
  },
};

// GET: Obtenir le profil de risque
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const profile = searchParams.get('profile') || 'moderate';

  const riskProfile = RISK_PROFILES[profile];
  if (!riskProfile) {
    return NextResponse.json(
      { error: `Profil de risque invalide: ${profile}` },
      { status: 400 }
    );
  }

  return NextResponse.json({
    profile,
    ...riskProfile,
    availableProfiles: Object.keys(RISK_PROFILES),
  });
}

// POST: Calculer la taille de position
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      accountBalance, 
      riskPercent, 
      entryPrice, 
      stopLoss, 
      profile = 'moderate' 
    } = body;

    if (!accountBalance || !riskPercent || !entryPrice || !stopLoss) {
      return NextResponse.json(
        { error: 'Paramètres manquants: accountBalance, riskPercent, entryPrice, stopLoss requis' },
        { status: 400 }
      );
    }

    const riskProfile = RISK_PROFILES[profile] || RISK_PROFILES.moderate;
    
    // Calcul du risque en montant
    const riskAmount = accountBalance * (riskPercent / 100);
    
    // Calcul de la taille de position
    const priceDiff = Math.abs(entryPrice - stopLoss);
    const positionSize = riskAmount / priceDiff;
    
    // Vérifier si la taille dépasse le maximum
    const finalSize = Math.min(positionSize, riskProfile.maxPositionSize);
    
    // Calcul du stop loss et take profit
    const calculatedStopLoss = stopLoss;
    const calculatedTakeProfit = entryPrice + (priceDiff * (riskProfile.takeProfitDefault / riskProfile.stopLossDefault));
    
    // Risque total
    const totalRisk = finalSize * priceDiff;
    const riskPercentOfAccount = (totalRisk / accountBalance) * 100;

    return NextResponse.json({
      success: true,
      position: {
        size: Math.round(finalSize * 100) / 100,
        entryPrice,
        stopLoss: calculatedStopLoss,
        takeProfit: Math.round(calculatedTakeProfit * 10000) / 10000,
      },
      risk: {
        amount: Math.round(riskAmount * 100) / 100,
        percent: Math.round(riskPercent * 100) / 100,
        percentOfAccount: Math.round(riskPercentOfAccount * 100) / 100,
      },
      profile,
      warnings: riskPercentOfAccount > riskProfile.maxDailyLoss 
        ? ['Risque quotidien dépassé!'] 
        : [],
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors du calcul' },
      { status: 500 }
    );
  }
}
