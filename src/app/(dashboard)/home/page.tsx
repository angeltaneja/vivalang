'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Sparkles,
  Flame,
  Zap,
  ArrowRight,
  Headphones,
  Mic,
  BookOpen,
  FileText,
  MessageSquareCode,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  Compass,
  Play
} from 'lucide-react';

export default function HomePage() {
  const { currentLanguage, userStats, ui, learnerMemories, notes } = useApp();

  // Find primary weakness memory if available
  const topWeakness = learnerMemories.find(m => m.category === 'WEAKNESS');

  return (
    <div className="space-y-8 pb-8">
      
      {/* Top Welcome & Language Overview Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-3xl">{currentLanguage.flag}</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {currentLanguage.name} — <span className="text-blue-400">{userStats.cefrLevel}</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Welcome back! Here is your personalized practice roadmap for today.
          </p>
        </div>

        {/* Quick Action Badges */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 rounded-2xl bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 text-xs font-bold text-orange-400">
            <Flame className="h-4 w-4 fill-orange-500" />
            <span>{userStats.streakDays} Day Streak</span>
          </div>
          <div className="flex items-center space-x-1.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 text-xs font-bold text-amber-400">
            <Zap className="h-4 w-4 fill-amber-400" />
            <span>{userStats.xp} XP</span>
          </div>
        </div>
      </div>

      {/* Dynamic AI Guidance Banner (Addresses PRD Section 3) */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/70 via-slate-900 to-slate-950 p-6 shadow-xl space-y-3">
        <div className="absolute right-0 top-0 h-40 w-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center space-x-2 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Tutor Smart Insight</span>
          </div>
          <span className="text-xs text-slate-400">Personalized Recommendation</span>
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white">
            {topWeakness ? topWeakness.fact : 'You often confuse avoir and être auxiliaries.'}
          </h3>
          <p className="text-xs text-slate-300">
            Your tutor detected this weakness from past conversations. Want to run a targeted 3-minute mini practice session?
          </p>
        </div>

        <div className="flex items-center space-x-3 pt-2">
          <Link
            href="/conversation"
            className="inline-flex items-center space-x-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 transition"
          >
            <Play className="h-3.5 w-3.5 fill-white" />
            <span>Practice with AI Tutor Now</span>
          </Link>
          <Link
            href="/lessons"
            className="text-xs font-semibold text-slate-400 hover:text-slate-200 transition"
          >
            View Grammar Lesson →
          </Link>
        </div>
      </div>

      {/* Today's Learning Progress Grid (Listening, Speaking, Vocabulary, Writing) */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">{ui.todayProgress}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <Headphones className="h-5 w-5 text-blue-400" />
              <span className="text-xs font-bold text-slate-400">{userStats.listeningMinutes} min</span>
            </div>
            <p className="text-xs font-semibold text-slate-200">{ui.listening}</p>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-3/4" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <Mic className="h-5 w-5 text-emerald-400" />
              <span className="text-xs font-bold text-slate-400">{userStats.speakingMinutes} min</span>
            </div>
            <p className="text-xs font-semibold text-slate-200">{ui.speaking}</p>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-1/2" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <BookOpen className="h-5 w-5 text-purple-400" />
              <span className="text-xs font-bold text-slate-400">{userStats.vocabularyMinutes} min</span>
            </div>
            <p className="text-xs font-semibold text-slate-200">{ui.vocabulary}</p>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 w-2/3" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <FileText className="h-5 w-5 text-amber-400" />
              <span className="text-xs font-bold text-slate-400">{userStats.writingMinutes} min</span>
            </div>
            <p className="text-xs font-semibold text-slate-200">{ui.writing}</p>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-1/2" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Action Hub: 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Continue Lesson */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 flex flex-col justify-between space-y-4 hover:border-blue-500/40 transition">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-bold text-blue-400 border border-blue-500/20">
                Unit 1 • Lesson 1
              </span>
              <BookOpen className="h-5 w-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Greetings & Courtesy</h3>
            <p className="text-xs text-slate-400">Master "Bonjour", "Merci", and polite address (Tu vs Vous).</p>
          </div>
          <Link
            href="/lessons"
            className="flex items-center justify-between rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-500 transition"
          >
            <span>{ui.startLesson}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Card 2: AI Voice Conversation Room */}
        <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/40 to-slate-900 p-6 flex flex-col justify-between space-y-4 hover:border-indigo-500/50 transition">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                Live Voice Room
              </span>
              <MessageSquareCode className="h-5 w-5 text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Marie Laurent</h3>
            <p className="text-xs text-slate-300">Parisian Florist • Speaks slow, encouraging French.</p>
          </div>
          <Link
            href="/conversation"
            className="flex items-center justify-between rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 transition"
          >
            <span>Start Voice Partner 🎙️</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Card 3: Real World Scenario */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 flex flex-col justify-between space-y-4 hover:border-purple-500/40 transition">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-purple-500/10 px-2.5 py-0.5 text-xs font-bold text-purple-400 border border-purple-500/20">
                Scenario
              </span>
              <Compass className="h-5 w-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white">☕ Ordering at a Café</h3>
            <p className="text-xs text-slate-400">Roleplay ordering coffee and asking for l'addition in Paris.</p>
          </div>
          <Link
            href="/scenarios"
            className="flex items-center justify-between rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-700 transition"
          >
            <span>Enter Scenario</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>

      {/* Recent Notes Preview & Weak Areas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Personal Notes */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">{ui.recentNotes}</h3>
            <Link href="/notes" className="text-xs font-semibold text-blue-400 hover:underline">
              View All Notes →
            </Link>
          </div>

          <div className="space-y-3">
            {notes.slice(0, 2).map((note) => (
              <Link
                key={note.id}
                href="/notes"
                className="block rounded-2xl border border-slate-800 bg-slate-950 p-4 hover:border-slate-700 transition space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{note.title}</span>
                  <span className="text-[10px] font-semibold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                    {note.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">{note.content.substring(0, 100)}...</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Spaced Repetition SRS Vocab Review Trigger */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-amber-400">
              <RotateCw className="h-5 w-5" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Spaced Repetition Review</h3>
            </div>
            <h4 className="text-xl font-bold text-white">5 Words Due for Review Today</h4>
            <p className="text-xs text-slate-400">
              Words like <span className="font-semibold text-white">"pourtant"</span> and <span className="font-semibold text-white">"l'addition"</span> are approaching your memory forget curve.
            </p>
          </div>

          <Link
            href="/vocabulary"
            className="w-full flex items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 py-3 text-xs font-bold text-white shadow-lg shadow-amber-500/20 hover:from-amber-500 hover:to-orange-500 transition"
          >
            <span>Review Flashcards Now</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>

    </div>
  );
}
