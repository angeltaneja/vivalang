'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { SUPPORTED_LANGUAGES } from '@/data/languages';
import { User, Flame, Zap, Award, Clock, Globe, Settings, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const { currentLanguage, userStats, updateStats } = useApp();

  const achievements = [
    { title: 'First Conversation', icon: '🏆', desc: 'Completed your first AI Voice session', unlocked: true },
    { title: '10 Minutes Speaking', icon: '🎙️', desc: 'Practiced speaking with AI partner', unlocked: true },
    { title: '7 Day Streak', icon: '🔥', desc: 'Maintained practice for 7 straight days', unlocked: true },
    { title: '500 Words Learned', icon: '📚', desc: 'Mastered 500 vocabulary words', unlocked: false },
    { title: 'First Language Completed', icon: '🌎', desc: 'Reached CEFR B2 level in any language', unlocked: false },
  ];

  return (
    <div className="space-y-8 pb-8 max-w-4xl mx-auto">
      
      {/* User Header */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-3xl font-black text-white shadow-xl shadow-blue-500/25">
          V
        </div>
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start space-x-2">
            <h1 className="text-2xl font-extrabold text-white">Learner Profile</h1>
            <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-bold text-blue-400 border border-blue-500/20">
              Pro Member
            </span>
          </div>
          <p className="text-xs text-slate-400">Native Language: English • Target: {currentLanguage.name}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-center">
          <Flame className="h-6 w-6 text-orange-400 mx-auto mb-1 fill-orange-400" />
          <p className="text-xl font-black text-white">{userStats.streakDays} Days</p>
          <p className="text-xs text-slate-400">Streak</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-center">
          <Zap className="h-6 w-6 text-amber-400 mx-auto mb-1 fill-amber-400" />
          <p className="text-xl font-black text-white">{userStats.xp} XP</p>
          <p className="text-xs text-slate-400">Total Points</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-center">
          <Clock className="h-6 w-6 text-blue-400 mx-auto mb-1" />
          <p className="text-xl font-black text-white">{userStats.totalMinutes} min</p>
          <p className="text-xs text-slate-400">Practice Time</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-center">
          <Globe className="h-6 w-6 text-purple-400 mx-auto mb-1" />
          <p className="text-xl font-black text-white">{SUPPORTED_LANGUAGES.length}</p>
          <p className="text-xs text-slate-400">Available Worlds</p>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Badges & Achievements</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {achievements.map((a, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-4 flex items-center space-x-3 transition ${
                a.unlocked
                  ? 'border-slate-800 bg-slate-900 text-white'
                  : 'border-slate-900 bg-slate-950/60 text-slate-500 opacity-60'
              }`}
            >
              <span className="text-3xl">{a.icon}</span>
              <div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-bold">{a.title}</p>
                  {a.unlocked && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                </div>
                <p className="text-xs text-slate-400">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
