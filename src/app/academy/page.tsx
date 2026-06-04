"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";
import {
  GraduationCap,
  Play,
  FileText,
  CheckCircle,
  Lock,
  Clock,
  Award,
  TrendingUp,
  BarChart3,
  Brain,
  Shield,
  Zap,
} from "lucide-react";

export default function AcademyPage() {
  const [lesson, setLesson] = useState<string | null>(null);

  const courses = [
    {
      id: "beginner",
      title: "Débutant",
      description: "Maîtrisez les bases du trading",
      icon: GraduationCap,
      color: "text-accent-green",
      bg: "bg-accent-green/20",
      lessons: [
        { id: "b1", title: "Qu'est-ce que le trading ?", duration: "15 min", type: "video" },
        { id: "b2", title: "Comprendre les marchés financiers", duration: "20 min", type: "video" },
        { id: "b3", title: "Les bases de l'analyse technique", duration: "25 min", type: "video" },
        { id: "b4", title: "Gestion du risque et du capital", duration: "20 min", type: "article" },
        { id: "b5", title: "Quiz de validation - Débutant", duration: "10 min", type: "quiz" },
      ],
    },
    {
      id: "intermediate",
      title: "Intermédiaire",
      description: "Stratégies avancées",
      icon: TrendingUp,
      color: "text-electron-gold",
      bg: "bg-electron-gold/20",
      locked: true,
      lessons: [
        { id: "i1", title: "Indicateurs techniques avancés (RSI, MACD)", duration: "30 min", type: "video" },
        { id: "i2", title: "Patterns de chandeliers japonais", duration: "25 min", type: "video" },
        { id: "i3", title: "Analyse des tendances", duration: "20 min", type: "article" },
        { id: "i4", title: "Gestion du stop-loss", duration: "15 min", type: "video" },
        { id: "i5", title: "Quiz de validation - Intermédiaire", duration: "15 min", type: "quiz" },
      ],
    },
    {
      id: "scalping",
      title: "Scalping",
      description: "Trading rapide",
      icon: Zap,
      color: "text-accent-cyan",
      bg: "bg-accent-cyan/20",
      locked: true,
      lessons: [
        { id: "s1", title: "Introduction au scalping", duration: "20 min", type: "video" },
        { id: "s2", title: "Stratégies de scalping", duration: "30 min", type: "video" },
        { id: "s3", title: "Gestion du risque en scalping", duration: "15 min", type: "article" },
        { id: "s4", title: "Psychologie du trader", duration: "20 min", type: "video" },
      ],
    },
    {
      id: "swing",
      title: "Swing Trading",
      description: "Trades medio-term",
      icon: BarChart3,
      color: "text-purple-400",
      bg: "bg-purple-400/20",
      locked: true,
      lessons: [
        { id: "w1", title: "Fondamentaux du swing trading", duration: "25 min", type: "video" },
        { id: "w2", title: "Analyse macro-économique", duration: "30 min", type: "video" },
        { id: "w3", title: "Positionnement en swing", duration: "20 min", type: "article" },
      ],
    },
    {
      id: "algo",
      title: "Algo Trading",
      description: "Automatisation",
      icon: Brain,
      color: "text-electron-yellow",
      bg: "bg-electron-yellow/20",
      locked: true,
      lessons: [
        { id: "a1", title: "Introduction aux algorithmes", duration: "30 min", type: "video" },
        { id: "a2", title: "Construction de robots de trading", duration: "45 min", type: "video" },
        { id: "a3", title: "Backtesting", duration: "30 min", type: "video" },
        { id: "a4", title: "API et automatisation", duration: "40 min", type: "article" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      <Sidebar />
      
      <main className="ml-72 p-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Académie E-Traders</h1>
          <p className="text-gray-400">Progressez étape par étape vers la maîtrise du trading</p>
        </header>
        
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <ProgressCard
            icon={<GraduationCap />}
            label="Cours Complétés"
            value="3/15"
            color="text-accent-green"
          />
          <ProgressCard
            icon={<Clock />}
            label="Heures de Formation"
            value="8.5h"
            color="text-electron-gold"
          />
          <ProgressCard
            icon={<Award />}
            label="Badges Obtenus"
            value="2"
            color="text-accent-cyan"
          />
          <ProgressCard
            icon={<Shield />}
            label="Score Quiz"
            value="87%"
            color="text-purple-400"
          />
        </div>
        
        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const Icon = course.icon;
            return (
              <div
                key={course.id}
                className={cn(
                  "p-6 bg-dark-card border border-dark-border rounded-2xl transition-all",
                  !course.locked && "hover:border-electron-gold/50 cursor-pointer"
                )}
                onClick={() => !course.locked && setLesson(course.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={cn("p-3 rounded-xl", course.bg)}>
                    <Icon className={cn("w-6 h-6", course.color)} />
                  </div>
                  {course.locked && (
                    <Lock className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{course.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Play className="w-4 h-4" />
                    {course.lessons.filter(l => l.type === "video").length} vidéos
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {course.lessons.filter(l => l.type === "article").length} articles
                  </span>
                </div>
                
                {/* Lessons Preview */}
                {!lesson && (
                  <div className="mt-4 pt-4 border-t border-dark-border">
                    <div className="space-y-2">
                      {course.lessons.slice(0, 3).map((l) => (
                        <div key={l.id} className="flex items-center justify-between text-sm">
                          <span className={cn("text-gray-400", !course.locked && "hover:text-white")}>
                            {l.title}
                          </span>
                          <span className="text-gray-500">{l.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {lesson && lesson === course.id && (
                  <div className="mt-4 pt-4 border-t border-dark-border space-y-2">
                    {course.lessons.map((l) => (
                      <div
                        key={l.id}
                        className="flex items-center justify-between p-3 bg-dark-bg/50 rounded-xl hover:bg-dark-hover cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {l.type === "video" && <Play className="w-4 h-4 text-accent-cyan" />}
                          {l.type === "article" && <FileText className="w-4 h-4 text-electron-gold" />}
                          {l.type === "quiz" && <CheckCircle className="w-4 h-4 text-accent-green" />}
                          <span className="text-sm text-white">{l.title}</span>
                        </div>
                        <span className="text-xs text-gray-500">{l.duration}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <button
                  className={cn(
                    "w-full mt-4 py-3 rounded-xl font-medium transition-colors",
                    course.locked
                      ? "bg-dark-bg text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-electron-gold to-electron-yellowDark text-premium-900 hover:from-electron-goldLight"
                  )}
                >
                  {course.locked ? "Verrouillé" : "Commencer"}
                </button>
              </div>
            );
          })}
        </div>
        
        {/* Paper Trading Simulator */}
        <div className="mt-8 p-8 bg-gradient-to-br from-electron-gold/10 to-accent-cyan/10 border border-electron-gold/20 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Simulateur de Trading</h2>
              <p className="text-gray-400">
                Pratiquez sans risiko avec $100,000 virtuels
              </p>
            </div>
            <button className="px-6 py-3 bg-electron-gold text-premium-900 font-semibold rounded-xl hover:bg-electron-goldLight transition-colors">
              Lancer le Simulateur
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-dark-card/50 rounded-xl">
              <p className="text-gray-400 text-sm">Capital Virtuel</p>
              <p className="text-2xl font-bold text-electron-gold">$100,000</p>
            </div>
            <div className="p-4 bg-dark-card/50 rounded-xl">
              <p className="text-gray-400 text-sm">Profit/Pertes</p>
              <p className="text-2xl font-bold text-accent-green">+$12,450</p>
            </div>
            <div className="p-4 bg-dark-card/50 rounded-xl">
              <p className="text-gray-400 text-sm">Transactions</p>
              <p className="text-2xl font-bold text-white">156</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ProgressCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="p-4 bg-dark-card border border-dark-border rounded-xl">
      <div className={cn("mb-2", color)}>{icon}</div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  );
}