'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { SUPPORTED_LANGUAGES } from '@/data/languages';
import { Flame, Zap, Globe, Sparkles, ChevronDown } from 'lucide-react';

export function Navbar() {
  const { currentLanguage, setCurrentLanguageCode, immersionMode, setImmersionMode, userStats, ui } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/25 ring-1 ring-white/20">
            <span className="text-xl font-black text-white">V</span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-lg font-bold tracking-tight text-white">VivaLang</span>
              <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-400 ring-1 ring-blue-500/20">
                AI World
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Live the language you learn</p>
          </div>
        </div>

        {/* Language Selector Dropdown */}
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <button className="flex items-center space-x-2 rounded-xl bg-slate-900 px-3 py-1.5 text-sm font-medium text-slate-200 ring-1 ring-slate-800 hover:bg-slate-800/80 hover:ring-slate-700 transition">
              <span className="text-lg">{currentLanguage.flag}</span>
              <span className="hidden md:inline font-semibold">{currentLanguage.name}</span>
              <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[11px] font-bold text-blue-400 border border-blue-500/30">
                {userStats.cefrLevel}
              </span>
              <ChevronDown className="h-4 w-4 text-slate-400 group-hover:rotate-180 transition-transform" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-slate-800 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
              <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Switch Language World
              </div>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setCurrentLanguageCode(lang.code)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition ${
                    lang.code === currentLanguage.code
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xl">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">{lang.supportedLevels[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Immersion Mode Toggle */}
          <button
            onClick={() => setImmersionMode(!immersionMode)}
            className={`flex items-center space-x-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition border ${
              immersionMode
                ? 'bg-purple-600/20 text-purple-300 border-purple-500/40 ring-1 ring-purple-500/20'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
            title="When active, the UI text dynamically shifts into your target language!"
          >
            <Globe className={`h-3.5 w-3.5 ${immersionMode ? 'text-purple-400 animate-spin-slow' : ''}`} />
            <span className="hidden sm:inline">{ui.immersionMode}</span>
            <span className={`h-2 w-2 rounded-full ${immersionMode ? 'bg-purple-400 animate-pulse' : 'bg-slate-600'}`} />
          </button>

          {/* User Streak */}
          <div className="flex items-center space-x-1 rounded-xl bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 text-xs font-bold text-orange-400">
            <Flame className="h-4 w-4 fill-orange-500 text-orange-500 animate-bounce" />
            <span>{userStats.streakDays}d</span>
          </div>

          {/* User XP */}
          <div className="hidden sm:flex items-center space-x-1 rounded-xl bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 text-xs font-bold text-amber-400">
            <Zap className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span>{userStats.xp} XP</span>
          </div>
        </div>

      </div>
    </header>
  );
}
