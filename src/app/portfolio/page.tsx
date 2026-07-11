"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { cn, formatCurrency, formatPercent, formatDate } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  BarChart3,
  History,
  Download,
  Filter,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Percent,
  Calendar,
  RefreshCw,
  ExternalLink,
  Bell,
  ArrowLeft,
  X,
  CreditCard,
  Banknote,
  Send,
} from "lucide-react";

// Portfolio data
const portfolioSummary = {
  totalBalance: 125430.00,
  dayProfit: 2340.50,
  dayPercent: 1.90,
  weekProfit: 8920.30,
  weekPercent: 7.65,
  monthProfit: 15420.00,
  monthPercent: 14.02,
};

// Holdings
const holdings = [
  { symbol: "BTC", name: "Bitcoin", quantity: 1.25, avgEntry: 58000, current: 67430, value: 84287.50, allocation: 67.2, change: 16.26 },
  { symbol: "ETH", name: "Ethereum", quantity: 15, avgEntry: 2800, current: 3520, value: 52800, allocation: 42.1, change: 25.71 },
  { symbol: "EUR", name: "Cash USD", quantity: 12500, avgEntry: 1, current: 1, value: 12500, allocation: 10.0, change: 0 },
];

// Transaction history
const transactions = [
  { id: "1", type: "buy", symbol: "BTC", quantity: 0.5, price: 67200, total: 33600, date: "2024-06-04 14:30:00", status: "completed" },
  { id: "2", type: "sell", symbol: "ETH", quantity: 5, price: 3450, total: 17250, date: "2024-06-04 12:15:00", status: "completed" },
  { id: "3", type: "buy", symbol: "AAPL", quantity: 50, price: 177.50, total: 8875, date: "2024-06-03 16:45:00", status: "completed" },
  { id: "4", type: "buy", symbol: "NVDA", quantity: 10, price: 870.00, total: 8700, date: "2024-06-03 10:20:00", status: "completed" },
  { id: "5", type: "sell", symbol: "TSLA", quantity: 25, price: 175.00, total: 4375, date: "2024-06-02 09:30:00", status: "completed" },
];

// Performance data for chart - expanded
const performanceData = {
  day: [
    { day: "9:00", value: 112000 },
    { day: "10:00", value: 113500 },
    { day: "11:00", value: 111200 },
    { day: "12:00", value: 116800 },
    { day: "13:00", value: 118900 },
    { day: "14:00", value: 121200 },
    { day: "15:00", value: 123450 },
    { day: "16:00", value: 124000 },
  ],
  week: [
    { day: "Lun", value: 112000 },
    { day: "Mar", value: 113500 },
    { day: "Mer", value: 111200 },
    { day: "Jeu", value: 116800 },
    { day: "Ven", value: 118900 },
    { day: "Sam", value: 121200 },
    { day: "Dim", value: 123450 },
  ],
  month: [
    { day: "Sem 1", value: 95000 },
    { day: "Sem 2", value: 102000 },
    { day: "Sem 3", value: 108000 },
    { day: "Sem 4", value: 115000 },
  ],
  year: [
    { day: "Jan", value: 85000 },
    { day: "Fév", value: 92000 },
    { day: "Mar", value: 88000 },
    { day: "Avr", value: 95000 },
    { day: "Mai", value: 105000 },
    { day: "Juin", value: 123450 },
  ],
};

// Pie chart colors
const COLORS = ['#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'];

// Allocation data for pie chart
const allocationData = [
  { name: "Bitcoin", value: 67.2 },
  { name: "Ethereum", value: 42.1 },
  { name: "Cash", value: 10.0 },
];

export default function PortfolioPage() {
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [timeframe, setTimeframe] = useState("day");
  const [balance, setBalance] = useState(portfolioSummary.totalBalance);
  
  // Deposit/Withdraw modal states
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  
  // Handle deposit
  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (!amount || amount <= 0) {
      alert("Veuillez entrer un montant valide");
      return;
    }
    setBalance(balance + amount);
    alert(`Dépôt de ${formatCurrency(amount)} effectué avec succès!`);
    setDepositAmount("");
    setShowDepositModal(false);
  };
  
  // Handle withdraw
  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount <= 0) {
      alert("Veuillez entrer un montant valide");
      return;
    }
    if (amount > balance) {
      alert("Solde insuffisant");
      return;
    }
    setBalance(balance - amount);
    alert(`Retrait de ${formatCurrency(amount)} effectué avec succès!`);
    setWithdrawAmount("");
    setShowWithdrawModal(false);
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <main className={cn("transition-all duration-300", sidebarCollapsed ? "ml-20" : "ml-72")}>
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="p-2 bg-dark-card border border-dark-border rounded-xl hover:bg-dark-hover transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Mon Portefeuille</h1>
              <p className="text-gray-400">Suivez vos actifs et performances</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/market')}
              className="flex items-center gap-2 px-4 py-2 bg-dark-card border border-dark-border text-gray-400 rounded-xl hover:text-white hover:border-dark-hover transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
             Exporter
            </button>
            <button 
              onClick={() => router.push('/trading')}
              className="flex items-center gap-2 px-4 py-2 bg-dark-card border border-dark-border text-gray-400 rounded-xl hover:text-white hover:border-dark-hover transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Synchroniser
            </button>
            <button
              onClick={() => router.push('/settings')}
              className="p-2 bg-dark-card border border-dark-border rounded-xl hover:bg-dark-hover transition-colors cursor-pointer relative"
            >
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-electron-gold rounded-full"></span>
            </button>
          </div>
        </header>
        
        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <BalanceCard
            label="Solde Total"
            value={formatCurrency(portfolioSummary.totalBalance)}
            icon={<Wallet />}
            color="text-electron-gold"
          />
          <BalanceCard
            label="Aujourd'hui"
            value={formatCurrency(portfolioSummary.dayProfit)}
            prefix={portfolioSummary.dayProfit >= 0 ? "+" : ""}
            percent={portfolioSummary.dayPercent}
            icon={<TrendingUp />}
            positive={portfolioSummary.dayProfit >= 0}
          />
          <BalanceCard
            label="Cette Semaine"
            value={formatCurrency(portfolioSummary.weekProfit)}
            prefix={portfolioSummary.weekProfit >= 0 ? "+" : ""}
            percent={portfolioSummary.weekPercent}
            icon={<BarChart3 />}
            positive={portfolioSummary.weekProfit >= 0}
          />
          <BalanceCard
            label="Ce Mois"
            value={formatCurrency(portfolioSummary.monthProfit)}
            prefix={portfolioSummary.monthProfit >= 0 ? "+" : ""}
            percent={portfolioSummary.monthPercent}
            icon={<Calendar />}
            positive={portfolioSummary.monthProfit >= 0}
          />
        </div>
        
        {/* Performance Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 p-6 bg-dark-card border border-dark-border rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Performance</h2>
              <div className="flex gap-2">
                <TimeframeBtn active={timeframe === "day"} onClick={() => setTimeframe("day")}>
                  1J
                </TimeframeBtn>
                <TimeframeBtn active={timeframe === "week"} onClick={() => setTimeframe("week")}>
                  1S
                </TimeframeBtn>
                <TimeframeBtn active={timeframe === "month"} onClick={() => setTimeframe("month")}>
                  1M
                </TimeframeBtn>
                <TimeframeBtn active={timeframe === "year"} onClick={() => setTimeframe("year")}>
                  1A
                </TimeframeBtn>
              </div>
            </div>
            
            {/* Interactive Chart with Recharts */}
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData[timeframe as keyof typeof performanceData]}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis 
                    dataKey="day" 
                    stroke="#9CA3AF" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#9CA3AF" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                    formatter={(value) => [formatCurrency(Number(value)), 'Valeur']}
                    labelStyle={{ color: '#9CA3AF' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#F59E0B" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    activeDot={{ r: 6, fill: '#F59E0B', stroke: '#fff', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-dark-border">
              <div>
                <p className="text-gray-400 text-sm">Meilleure Jour</p>
                <p className="text-accent-green font-bold">+$2,340</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Pire Jour</p>
                <p className="text-accent-red font-bold">-$890</p>
              </div>
            </div>
          </div>
          
          {/* Allocation */}
          <div className="p-6 bg-dark-card border border-dark-border rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-electron-gold" />
              Allocation
            </h2>
            
            {/* Interactive Pie Chart */}
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={holdings}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="symbol"
                  >
                    {holdings.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                    formatter={(value) => formatCurrency(Number(value))}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-3 mt-4">
              {holdings.map((holding, index) => (
                <div key={holding.symbol} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-medium text-white">{holding.symbol}</span>
                  </div>
                  <span className="text-sm text-gray-400">{holding.allocation}%</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-dark-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Nombre d'actifs</span>
                <span className="text-white font-medium">{holdings.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-400">Diversification</span>
                <span className="text-accent-green">Bonne</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Holdings Table */}
        <div className="p-6 bg-dark-card border border-dark-border rounded-2xl mb-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-electron-gold" />
            Mes Actifs
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Actif</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Quantité</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Prix Moyen</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Prix Actuel</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Valeur</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Allocation</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">P&L</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding) => (
                  <tr key={holding.symbol} className="border-b border-dark-border hover:bg-dark-hover/30">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-electron-gold/20 rounded-full flex items-center justify-center">
                          <span className="text-electron-gold font-bold">{holding.symbol.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-white">{holding.symbol}</p>
                          <p className="text-xs text-gray-500">{holding.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right text-white">{holding.quantity}</td>
                    <td className="py-4 px-4 text-right text-white">{formatCurrency(holding.avgEntry)}</td>
                    <td className="py-4 px-4 text-right text-white">{formatCurrency(holding.current)}</td>
                    <td className="py-4 px-4 text-right text-white font-medium">{formatCurrency(holding.value)}</td>
                    <td className="py-4 px-4 text-right text-gray-400">{holding.allocation}%</td>
                    <td className="py-4 px-4 text-right">
                      <span className={cn(
                        "text-sm",
                        holding.change >= 0 ? "text-accent-green" : "text-accent-red"
                      )}>
                        {holding.change >= 0 ? "+" : ""}{formatPercent(holding.change)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button 
                        onClick={() => router.push('/trading')}
                        className="px-3 py-1.5 text-xs border border-dark-border rounded-lg hover:border-electron-gold hover:text-electron-gold transition-colors cursor-pointer"
                      >
                        Trader
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-dark-border">
            <div className="text-gray-400">
              Total: <span className="text-white font-bold ml-2">{formatCurrency(balance)}</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowDepositModal(true)}
                className="px-4 py-2 border border-dark-border text-gray-400 rounded-xl hover:text-white hover:border-electron-gold transition-colors cursor-pointer"
              >
                Ajouter Fond
              </button>
              <button 
                onClick={() => setShowWithdrawModal(true)}
                className="px-4 py-2 border border-dark-border text-gray-400 rounded-xl hover:text-white hover:border-electron-gold transition-colors cursor-pointer"
              >
                Retirer
              </button>
            </div>
          </div>
        </div>
        
        {/* Transaction History */}
        <div className="p-6 bg-dark-card border border-dark-border rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <History className="w-5 h-5 text-electron-gold" />
            Historique des Transactions
          </h2>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-10 pr-4 py-2 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-electron-gold transition-colors"
              />
            </div>
            <button 
              onClick={() => router.push('/market')}
              className="flex items-center gap-2 px-4 py-2 bg-dark-bg border border-dark-border text-gray-400 rounded-xl hover:text-white cursor-pointer"
            >
              <Filter className="w-4 h-4" />
              Filtrer
            </button>
          </div>
          
          <div className="space-y-2">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 bg-dark-bg/50 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-2 rounded-lg",
                    tx.type === "buy" ? "bg-accent-green/20" : "bg-accent-red/20"
                  )}>
                    {tx.type === "buy" ? (
                      <ArrowDownRight className="w-5 h-5 text-accent-green" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-accent-red" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{tx.type === "buy" ? "Achat" : "Vente"}</span>
                      <span className="text-white font-bold">{tx.symbol}</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {tx.quantity} @ {formatCurrency(tx.price)} • {tx.date}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-medium text-white">{formatCurrency(tx.total)}</p>
                    <div className="flex items-center gap-1 text-xs">
                      <span className={cn(
                        "flex items-center gap-1",
                        tx.status === "completed" ? "text-accent-green" : "text-yellow-400"
                      )}>
                        {tx.status === "completed" ? (
                          <>
                            <DollarSign className="w-3 h-3" />
                            Complété
                          </>
                        ) : (
                          <>
                            <RefreshCw className="w-3 h-3" />
                            En cours
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                  
                  <button className="p-2 hover:bg-dark-hover rounded-lg transition-colors">
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors">
              Voir tout l'historique
            </button>
          </div>
        </div>
        
        {/* Deposit Modal */}
        {showDepositModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Banknote className="w-6 h-6 text-accent-green" />
                  Déposer des Fonds
                </h2>
                <button 
                  onClick={() => setShowDepositModal(false)}
                  className="p-2 hover:bg-dark-border rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Montant ($)</label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="Entrez le montant"
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-white placeholder-gray-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Méthode de paiement</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={cn(
                        "p-3 rounded-xl border transition-colors cursor-pointer",
                        paymentMethod === "card" 
                          ? "border-electron-gold bg-electron-gold/10" 
                          : "border-dark-border"
                      )}
                    >
                      <CreditCard className="w-6 h-6 mx-auto text-white" />
                      <span className="text-xs text-gray-400 block mt-1">Carte</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("bank")}
                      className={cn(
                        "p-3 rounded-xl border transition-colors cursor-pointer",
                        paymentMethod === "bank" 
                          ? "border-electron-gold bg-electron-gold/10" 
                          : "border-dark-border"
                      )}
                    >
                      <Banknote className="w-6 h-6 mx-auto text-white" />
                      <span className="text-xs text-gray-400 block mt-1">Virement</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("crypto")}
                      className={cn(
                        "p-3 rounded-xl border transition-colors cursor-pointer",
                        paymentMethod === "crypto" 
                          ? "border-electron-gold bg-electron-gold/10" 
                          : "border-dark-border"
                      )}
                    >
                      <Send className="w-6 h-6 mx-auto text-white" />
                      <span className="text-xs text-gray-400 block mt-1">Crypto</span>
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={handleDeposit}
                  className="w-full py-4 bg-accent-green hover:bg-accent-green/80 text-white font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Déposer {depositAmount ? formatCurrency(parseFloat(depositAmount)) : "$0"}
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Withdraw Modal */}
        {showWithdrawModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Banknote className="w-6 h-6 text-accent-red" />
                  Retirer des Fonds
                </h2>
                <button 
                  onClick={() => setShowWithdrawModal(false)}
                  className="p-2 hover:bg-dark-border rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-dark-bg rounded-xl">
                  <p className="text-gray-400 text-sm">Solde disponible</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(balance)}</p>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Montant ($)</label>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Entrez le montant"
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-white placeholder-gray-500"
                  />
                </div>
                
                <button
                  onClick={handleWithdraw}
                  disabled={parseFloat(withdrawAmount) > balance}
                  className="w-full py-4 bg-accent-red hover:bg-accent-red/80 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Retirer {withdrawAmount ? formatCurrency(parseFloat(withdrawAmount)) : "$0"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function BalanceCard({
  label,
  value,
  prefix,
  percent,
  icon,
  color,
  positive,
}: {
  label: string;
  value: string;
  prefix?: string;
  percent?: number;
  icon: React.ReactNode;
  color?: string;
  positive?: boolean;
}) {
  return (
    <div className="p-6 bg-dark-card border border-dark-border rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-400">{label}</span>
        <span className={color || (positive !== undefined ? (positive ? "text-accent-green" : "text-accent-red") : "text-electron-gold")}>
          {icon}
        </span>
      </div>
      <p className="text-2xl font-bold text-white mb-1">
        {prefix && <span className={positive !== undefined ? (positive ? "text-accent-green" : "text-accent-red") : ""}>{prefix}</span>}
        {value}
      </p>
      {percent !== undefined && (
        <p className={positive !== undefined ? (positive ? "text-accent-green text-sm" : "text-accent-red text-sm") : "text-gray-500 text-sm"}>
          {positive !== undefined && (positive ? "+" : "")}{percent}%
        </p>
      )}
    </div>
  );
}

function TimeframeBtn({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 text-sm rounded-lg transition-colors",
        active
          ? "bg-electron-gold text-premium-900 font-medium"
          : "text-gray-400 hover:text-white hover:bg-dark-hover"
      )}
    >
      {children}
    </button>
  );
}