import { NextResponse } from 'next/server';

// Types pour le monitoring
interface ServiceMetric {
  name: string;
  status: 'up' | 'down' | 'degraded';
  uptime: number;
  responseTime: number;
  lastCheck: string;
}

interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

// Métriques des services simulées
const SERVICES: ServiceMetric[] = [
  {
    name: 'Frontend Next.js',
    status: 'up',
    uptime: 99.9,
    responseTime: 145,
    lastCheck: new Date().toISOString(),
  },
  {
    name: 'PostgreSQL',
    status: 'up',
    uptime: 99.99,
    responseTime: 23,
    lastCheck: new Date().toISOString(),
  },
  {
    name: 'Redis',
    status: 'up',
    uptime: 99.95,
    responseTime: 2,
    lastCheck: new Date().toISOString(),
  },
  {
    name: 'Ollama API',
    status: 'degraded',
    uptime: 98.5,
    responseTime: 1250,
    lastCheck: new Date().toISOString(),
  },
  {
    name: 'n8n Automation',
    status: 'up',
    uptime: 99.8,
    responseTime: 89,
    lastCheck: new Date().toISOString(),
  },
];

// GET: Obtenir les métriques du système
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  try {
    // Métriques système simulées
    const systemMetrics: SystemMetrics = {
      cpu: 35 + Math.random() * 20,
      memory: 45 + Math.random() * 15,
      disk: 62 + Math.random() * 5,
      network: 15 + Math.random() * 30,
    };

    if (type === 'services') {
      return NextResponse.json({
        success: true,
        services: SERVICES,
        summary: {
          total: SERVICES.length,
          up: SERVICES.filter(s => s.status === 'up').length,
          degraded: SERVICES.filter(s => s.status === 'degraded').length,
          down: SERVICES.filter(s => s.status === 'down').length,
        },
      });
    }

    if (type === 'metrics') {
      return NextResponse.json({
        success: true,
        metrics: systemMetrics,
        timestamp: new Date().toISOString(),
        alerts: systemMetrics.cpu > 80 ? ['CPU élevé'] : [],
      });
    }

    if (type === 'history') {
      // Retourner l'historique simulé
      const history = [];
      for (let i = 24; i >= 0; i--) {
        history.push({
          timestamp: new Date(Date.now() - i * 3600000).toISOString(),
          cpu: 30 + Math.random() * 30,
          memory: 40 + Math.random() * 20,
          requests: Math.floor(1000 + Math.random() * 2000),
        });
      }
      return NextResponse.json({
        success: true,
        history,
      });
    }

    if (type === 'alerts') {
      const alerts = [
        {
          id: '1',
          severity: 'warning',
          message: 'Ollama response time elevated',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          service: 'Ollama API',
        },
        {
          id: '2',
          severity: 'info',
          message: 'Routine backup completed',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          service: 'Database',
        },
      ];
      
      return NextResponse.json({
        success: true,
        alerts,
      });
    }

    // Retourner le status global
    return NextResponse.json({
      success: true,
      agent: 'system-monitor',
      description: 'Agent de surveillance système avancée',
      status: 'active',
      services: SERVICES,
      metrics: systemMetrics,
      summary: {
        overallStatus: 'healthy',
        uptime: '99.95%',
        activeConnections: 127,
        requestsPerMinute: 2450,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors du monitoring' },
      { status: 500 }
    );
  }
}

// POST: Configurer les alertes
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, config } = body;

    if (action === 'configure') {
      return NextResponse.json({
        success: true,
        message: 'Configuration des alertes mise à jour',
        config: {
          cpuThreshold: config?.cpuThreshold || 80,
          memoryThreshold: config?.memoryThreshold || 85,
          responseTimeThreshold: config?.responseTimeThreshold || 1000,
          emailNotifications: config?.emailNotifications || true,
        },
      });
    }

    if (action === 'test-alert') {
      return NextResponse.json({
        success: true,
        message: 'Alerte de test envoyée',
        alertId: `alert-test-${Date.now()}`,
      });
    }

    return NextResponse.json(
      { error: 'Action non reconnue' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur de configuration' },
      { status: 500 }
    );
  }
}
