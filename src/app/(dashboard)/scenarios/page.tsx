'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { REAL_WORLD_SCENARIOS } from '@/data/scenariosData';
import { Compass, ArrowRight, CheckCircle2, Target } from 'lucide-react';

export default function ScenariosPage() {
  const { currentLanguage } = useApp();

  const scenarios = REAL_WORLD_SCENARIOS.filter(s => s.languageCode === currentLanguage.code);

  return (
    <div className="space-y-8 pb-8">
      
      {/* Header */}
      <div className="space-y-2 border-b border-slate-800 pb-6">
        <div className="flex items-center space-x-2">
          <Compass className="h-6 w-6 text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Real-World Scenarios</h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Practice realistic situations in {currentLanguage.name}. Your AI partner will roleplay as a waiter, receptionist, driver, or doctor.
        </p>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scenarios.map((sc) => (
          <div
            key={sc.id}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6 flex flex-col justify-between space-y-4 hover:border-blue-500/40 transition group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl">{sc.icon}</span>
                <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-bold text-blue-400 border border-blue-500/20">
                  {sc.difficulty}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition">{sc.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{sc.description}</p>
              </div>

              <div className="rounded-2xl bg-slate-950 p-3 border border-slate-800 space-y-1">
                <p className="text-[11px] font-semibold text-slate-400">Roleplay Setup:</p>
                <p className="text-xs text-slate-200">You: <span className="font-bold text-blue-400">{sc.userRole}</span></p>
                <p className="text-xs text-slate-200">AI: <span className="font-bold text-purple-400">{sc.aiRole}</span></p>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Scenario Goals:</p>
                {sc.goals.map((g, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-slate-300">
                    <Target className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>{g}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/conversation"
              className="flex items-center justify-center space-x-2 rounded-2xl bg-blue-600 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-500 transition"
            >
              <span>Enter Scenario Roleplay</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}
