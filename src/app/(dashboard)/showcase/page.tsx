'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Sparkles, MessageSquareCode, Globe2, Layers, BookOpen, FileText, ArrowRight, Github, CheckCircle2, ShieldCheck, Award } from 'lucide-react';

export default function ShowcasePage() {
  const { currentLanguage } = useApp();

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center space-x-2 rounded-full bg-blue-500/20 px-3.5 py-1 text-xs font-bold text-blue-300 border border-blue-500/30">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span>Project Showcase & Architecture Overview</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
          VivaLang — AI Language Learning Platform
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Central Philosophy: <span className="font-bold text-blue-400">"Don't just study a language. Live it."</span> <br />
          A full-stack, startup-quality platform combining a modern education platform, real-time AI conversation partner, spaced repetition, and dynamic immersion mode.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="https://github.com/angeltaneja/vivalang"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 rounded-2xl bg-slate-900 border border-slate-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition"
          >
            <Github className="h-4 w-4" />
            <span>GitHub Repository</span>
          </a>
          <Link
            href="/conversation"
            className="inline-flex items-center space-x-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-500 transition"
          >
            <MessageSquareCode className="h-4 w-4" />
            <span>Try AI Voice Room</span>
          </Link>
        </div>
      </div>

      {/* Feature Pillar Showcase Grid */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">System Capability Pillars</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400">
                <MessageSquareCode className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                Live Voice Pipeline
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">AI Conversation Room</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time Web Speech STT & TTS pipeline with a 4-state visual audio waveform (`LISTENING` 🎙️, `THINKING` 🤔, `SPEAKING` 🔊). Native AI personas with Gentle, Normal, and Teacher correction modes.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-400">
                <Globe2 className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                Dynamic i18n
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">Dynamic Immersion Mode</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Toggling Immersion Mode shifts the entire application interface into target language strings (*Accueil, Monde Linguistique, Leçons, Mes Notes*) so the UI itself becomes a learning tool.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400">
                <Layers className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                SM-2 Algorithm
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">Spaced Repetition (SRS)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Interactive 3D flashcard review engine calculating memory forget curves with 4 mastery feedback buttons (*Again, Hard, Good, Easy*). Automatically prioritizes weak vocabulary.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400">
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                Note Assistant
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">AI Personal Notes Workspace</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Markdown note taker connected to an AI drawer that can explain grammar nuances, generate interactive quizzes, or extract flashcards into the user’s review deck.
            </p>
          </div>

        </div>
      </div>

      {/* Full Tech Stack Table */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Production Tech Stack</h2>
        
        <div className="rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="px-6 py-3.5">Component Layer</th>
                <th className="px-6 py-3.5">Technology Used</th>
                <th className="px-6 py-3.5">Engineering Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              <tr>
                <td className="px-6 py-3.5 font-bold text-white">Framework</td>
                <td className="px-6 py-3.5 text-blue-400 font-mono">Next.js 16 (App Router)</td>
                <td className="px-6 py-3.5 text-slate-400">Server Components, API routes, fast hydration</td>
              </tr>
              <tr>
                <td className="px-6 py-3.5 font-bold text-white">UI & Logic</td>
                <td className="px-6 py-3.5 text-blue-400 font-mono">React 19 + TypeScript</td>
                <td className="px-6 py-3.5 text-slate-400">Type-safe state management & component hierarchy</td>
              </tr>
              <tr>
                <td className="px-6 py-3.5 font-bold text-white">Styling</td>
                <td className="px-6 py-3.5 text-blue-400 font-mono">Tailwind CSS v4</td>
                <td className="px-6 py-3.5 text-slate-400">Glassmorphism, dark theme, responsive layouts</td>
              </tr>
              <tr>
                <td className="px-6 py-3.5 font-bold text-white">AI Engine</td>
                <td className="px-6 py-3.5 text-purple-400 font-mono">Gemini 1.5 Flash LLM</td>
                <td className="px-6 py-3.5 text-slate-400">Structured JSON output for roleplays, corrections, quizzes</td>
              </tr>
              <tr>
                <td className="px-6 py-3.5 font-bold text-white">Voice Engine</td>
                <td className="px-6 py-3.5 text-emerald-400 font-mono">Web Speech STT & TTS</td>
                <td className="px-6 py-3.5 text-slate-400">Low-latency browser speech recognition & neural synthesis</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
