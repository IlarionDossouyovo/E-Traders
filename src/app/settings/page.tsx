"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Key, 
  Palette,
  Globe,
  Database,
  Save,
  Check,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [theme, setTheme] = useState("dark");

  const [profile, setProfile] = useState({
    name: "John Trader",
    email: "john@electron.trading",
    phone: "+33 6 12 34 56 78",
    timezone: "Europe/Paris"
  });

  const [notifications, setNotifications] = useState({
    signals: true,
    risk: true,
    portfolio: true,
    email: true,
    sms: false,
    push: true
  });

  const [security, setSecurity] = useState({
    mfa: true,
    sessionTimeout: "30",
    apiKeyRotation: "90"
  });

  const [apiKeys, setApiKeys] = useState({
    binance: "",
    mt5: "",
    openai: ""
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: "profile", label: "Profil", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Sécurité", icon: Shield },
    { id: "api", label: "API Keys", icon: Key },
    { id: "appearance", label: "Apparence", icon: Palette },
    { id: "trading", label: "Trading", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-dark-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="p-2 bg-dark-card border border-dark-border rounded-xl hover:bg-dark-hover transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <SettingsIcon className="w-8 h-8 text-electron-gold" />
                Paramètres
              </h1>
              <p className="text-gray-400 mt-2">
                Gérez votre compte et préférences E-Traders
              </p>
            </div>
          </div>
          <button
            onClick={() => alert('Notifications: Aucune nouvelle alerte')}
            className="p-2 bg-dark-card border border-dark-border rounded-xl hover:bg-dark-hover transition-colors cursor-pointer relative"
          >
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-electron-gold rounded-full"></span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-dark-card rounded-xl border border-dark-border p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? "bg-electron-gold/20 text-electron-gold"
                        : "text-gray-400 hover:bg-dark-border hover:text-white"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">Profil Utilisateur</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Nom complet</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="w-full bg-dark-border border border-dark-border rounded-lg px-4 py-3 text-white focus:border-electron-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="w-full bg-dark-border border border-dark-border rounded-lg px-4 py-3 text-white focus:border-electron-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Téléphone</label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        className="w-full bg-dark-border border border-dark-border rounded-lg px-4 py-3 text-white focus:border-electron-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Fuseau horaire</label>
                      <select
                        value={profile.timezone}
                        onChange={(e) => setProfile({...profile, timezone: e.target.value})}
                        className="w-full bg-dark-border border border-dark-border rounded-lg px-4 py-3 text-white focus:border-electron-gold focus:outline-none"
                      >
                        <option value="Europe/Paris">Paris (GMT+1)</option>
                        <option value="Europe/London">Londres (GMT+0)</option>
                        <option value="America/New_York">New York (GMT-5)</option>
                        <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">Notifications</h2>
                  
                  <div className="space-y-4">
                    {[
                      { key: "signals", label: "Signaux de trading", desc: "Recevoir les signaux IA en temps réel" },
                      { key: "risk", label: "Alertes de risque", desc: "Notifications lors de dépassement de limites" },
                      { key: "portfolio", label: "Mise à jour portfolio", desc: "Résumé quotidien des performances" },
                      { key: "email", label: "Notifications email", desc: "Recevoir par email" },
                      { key: "sms", label: "SMS", desc: "Alertes critiques par SMS" },
                      { key: "push", label: "Notifications push", desc: "Notifications navigateur" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-dark-border rounded-lg">
                        <div>
                          <p className="text-white font-medium">{item.label}</p>
                          <p className="text-sm text-gray-400">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => setNotifications({...notifications, [item.key]: !notifications[item.key as keyof typeof notifications]})}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            notifications[item.key as keyof typeof notifications] 
                              ? "bg-electron-gold" 
                              : "bg-gray-600"
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                            notifications[item.key as keyof typeof notifications] 
                              ? "translate-x-6" 
                              : "translate-x-0.5"
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">Sécurité</h2>
                  
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-yellow-500 font-medium">Authentification à deux facteurs</p>
                      <p className="text-sm text-gray-400">Recommandé pour sécuriser votre compte</p>
                    </div>
                    <button 
                      onClick={() => alert('Activation de l\'authentification à deux facteurs...')}
                      className="ml-auto bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-medium cursor-pointer"
                    >
                      Activer
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Délai d'inactivité (minutes)</label>
                      <select
                        value={security.sessionTimeout}
                        onChange={(e) => setSecurity({...security, sessionTimeout: e.target.value})}
                        className="w-full bg-dark-border border border-dark-border rounded-lg px-4 py-3 text-white"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 heure</option>
                        <option value="120">2 heures</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Rotation des clés API (jours)</label>
                      <select
                        value={security.apiKeyRotation}
                        onChange={(e) => setSecurity({...security, apiKeyRotation: e.target.value})}
                        className="w-full bg-dark-border border border-dark-border rounded-lg px-4 py-3 text-white"
                      >
                        <option value="30">30 jours</option>
                        <option value="60">60 jours</option>
                        <option value="90">90 jours</option>
                        <option value="180">180 jours</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "api" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">Clés API</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">API Binance</label>
                      <input
                        type="password"
                        value={apiKeys.binance}
                        onChange={(e) => setApiKeys({...apiKeys, binance: e.target.value})}
                        placeholder="Clé API Binance..."
                        className="w-full bg-dark-border border border-dark-border rounded-lg px-4 py-3 text-white focus:border-electron-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">MetaTrader 5</label>
                      <input
                        type="password"
                        value={apiKeys.mt5}
                        onChange={(e) => setApiKeys({...apiKeys, mt5: e.target.value})}
                        placeholder="Identifiant MT5..."
                        className="w-full bg-dark-border border border-dark-border rounded-lg px-4 py-3 text-white focus:border-electron-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">OpenAI / Ollama</label>
                      <input
                        type="password"
                        value={apiKeys.openai}
                        onChange={(e) => setApiKeys({...apiKeys, openai: e.target.value})}
                        placeholder="Clé API OpenAI..."
                        className="w-full bg-dark-border border border-dark-border rounded-lg px-4 py-3 text-white focus:border-electron-gold focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "appearance" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">Apparence</h2>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Thème</label>
                    <div className="grid grid-cols-3 gap-4">
                      <button 
                        onClick={() => setTheme("dark")}
                        className={`p-4 rounded-lg border-2 text-center transition-all ${
                          theme === "dark" 
                            ? "border-electron-gold bg-electron-gold/10 text-white" 
                            : "border-dark-border text-gray-400 hover:border-dark-hover"
                        }`}
                      >
                        <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-dark-bg" />
                        <p className="text-sm">Sombre</p>
                      </button>
                      <button 
                        onClick={() => setTheme("light")}
                        className={`p-4 rounded-lg border-2 text-center transition-all ${
                          theme === "light" 
                            ? "border-electron-gold bg-electron-gold/10 text-white" 
                            : "border-dark-border text-gray-400 hover:border-dark-hover"
                        }`}
                      >
                        <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gray-200" />
                        <p className="text-sm">Clair</p>
                      </button>
                      <button 
                        onClick={() => setTheme("auto")}
                        className={`p-4 rounded-lg border-2 text-center transition-all ${
                          theme === "auto" 
                            ? "border-electron-gold bg-electron-gold/10 text-white" 
                            : "border-dark-border text-gray-400 hover:border-dark-hover"
                        }`}
                      >
                        <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-r from-dark-bg to-gray-200" />
                        <p className="text-sm">Auto</p>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "trading" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">Paramètres de Trading</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Mode de trading par défaut</label>
                      <select className="w-full bg-dark-border border border-dark-border rounded-lg px-4 py-3 text-white">
                        <option>Paper Trading (Simulation)</option>
                        <option>Trading Réel</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Style de trading</label>
                      <select className="w-full bg-dark-border border border-dark-border rounded-lg px-4 py-3 text-white">
                        <option>Scalping</option>
                        <option>Swing Trading</option>
                        <option>Algo Trading</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Capital virtuel ($)</label>
                      <input
                        type="number"
                        defaultValue="100000"
                        className="w-full bg-dark-border border border-dark-border rounded-lg px-4 py-3 text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-dark-border">
                <button
                  onClick={handleSave}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all cursor-pointer ${
                    saved 
                      ? "bg-green-500 text-white" 
                      : "bg-electron-gold hover:bg-electron-goldDark text-black"
                  }`}
                >
                  {saved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                  {saved ? "Enregistré !" : "Enregistrer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}