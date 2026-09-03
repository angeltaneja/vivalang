'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { BarChart3, Award, Sparkles, CheckCircle2, TrendingUp, Clock, Volume2 } from 'lucide-react';

export default function ProgressPage() {
  const { currentLanguage, userStats } = useApp();

  return (
    <div className="space-y-8 pb-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="space-y-2 border-b border-slate-800 pb-6">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-6 w-6 text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Fluency Analytics & Milestones</h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Track meaningful language progress in {currentLanguage.name} based on CEFR benchmarks.
        </p>
      </div>

      {/* Level Progression Indicator */}
      <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{currentLanguage.flag}</span>
            <div>
              <p className="text-xs font-semibold text-slate-400">Current Level</p>
              <h2 className="text-2xl font-extrabold text-white">CEFR {userStats.cefrLevel} → B1 Intermediate</h2>
            </div>
          </div>
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
            68% Complete
          </span>
        </div>

        <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full w-2/3" />
        </div>
      </div>

      {/* Skill Breakdown Pillars (PRD Section 15) */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Skill Competency Breakdown</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { skill: 'Speaking', score: 82, color: 'emerald' },
            { skill: 'Listening', score: 91, color: 'blue' },
            { skill: 'Reading', score: 74, color: 'purple' },
            { skill: 'Writing', score: 63, color: 'amber' },
            { skill: 'Vocabulary', score: 81, color: 'cyan' },
            { skill: 'Grammar', score: 67, color: 'indigo' },
          ].map((s) => (
            <div key={s.skill} className="rounded-2xl border border-slate-800 bg-slate-900 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">{s.skill}</span>
                <span className="text-sm font-black text-white">{s.score}%</span>
              </div>
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${s.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Functional Milestones (PRD Section 15) */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Achieved Real-World Milestones</h3>
        <div className="space-y-3">
          {[
            { title: 'You can now have a 5-minute conversation in French.', icon: '💬', desc: 'Tested with AI Partner Marie Laurent' },
            { title: 'You understand 82% of beginner conversations.', icon: '🎧', desc: 'Listening Comprehension Verified' },
            { title: `You know ${userStats.wordsLearned} ${currentLanguage.name} words.`, icon: '📚', desc: 'Spaced Repetition Mastery > 70%' },
            { title: 'Your pronunciation improved by 12% this month.', icon: '🎙️', desc: 'Acoustic Rhythm & Enunciation Analysis' },
          ].map((m, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900 p-4 flex items-center space-x-4">
              <span className="text-3xl">{m.icon}</span>
              <div>
                <p className="text-sm font-bold text-white">{m.title}</p>
                <p className="text-xs text-slate-400">{m.desc}</p>
              </div>
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 ml-auto" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
