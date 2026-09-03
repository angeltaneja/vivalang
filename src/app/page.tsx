import React from 'react';
import Link from 'next/link';
import { Globe2, MessageSquareCode, Sparkles, Award, ArrowRight, ShieldCheck, Flame, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="space-y-24 py-6">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950 p-8 sm:p-12 lg:p-16 text-center space-y-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-gradient-to-b from-blue-500/15 via-indigo-500/5 to-transparent blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center space-x-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Next-Generation AI Language World</span>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Don’t just study a language. <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Live it.
            </span>
          </h1>
          <p className="text-base sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Step into realistic language worlds with real-time AI conversation partners, data-driven curriculums, voice diagnostics, spaced repetition, and personalized tutor memory.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/onboarding"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-blue-500/25 hover:from-blue-500 hover:to-indigo-500 transition transform hover:-translate-y-0.5"
          >
            <span>Start Learning Free</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/home"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-8 py-4 text-base font-bold text-slate-200 hover:bg-slate-800 transition"
          >
            <span>Explore Demo Dashboard</span>
          </Link>
        </div>

        {/* Floating Feature Badges */}
        <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 space-y-1">
            <span className="text-2xl">🇫🇷 🇩🇪 🇪🇸</span>
            <p className="text-xs font-bold text-white">Multi-Language Worlds</p>
            <p className="text-[11px] text-slate-400">French, German, Spanish & more</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 space-y-1">
            <MessageSquareCode className="h-6 w-6 text-blue-400" />
            <p className="text-xs font-bold text-white">AI Voice Partners</p>
            <p className="text-[11px] text-slate-400">Marie, Julien, Anna, Lukas</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 space-y-1">
            <Globe2 className="h-6 w-6 text-purple-400" />
            <p className="text-xs font-bold text-white">Immersion Mode</p>
            <p className="text-[11px] text-slate-400">Dynamic target language UI</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 space-y-1">
            <Award className="h-6 w-6 text-amber-400" />
            <p className="text-xs font-bold text-white">CEFR Levels A1-C2</p>
            <p className="text-[11px] text-slate-400">Functional fluency metrics</p>
          </div>
        </div>
      </section>

      {/* Feature Section 1: AI Conversation Room */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400">
            <MessageSquareCode className="h-4 w-4" />
            <span>Interactive AI Conversation Room</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Talk with real AI personalities, not a chatbot box.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Practice speaking naturally with distinct AI characters like Marie in Paris or Lukas in Berlin. Select your correction style (Gentle, Normal, Teacher) and receive instant fluency reports after every conversation.
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Real-time voice recognition & pronunciation analysis</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Real-world scenarios: Ordering Coffee, Hotel Check-in, Taxi Rides</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Post-conversation diagnostics: Grammar, Vocab, & Accent scores</span>
            </li>
          </ul>
        </div>

        {/* Visual Mockup Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-600/30 flex items-center justify-center text-xl">
                🇫🇷
              </div>
              <div>
                <p className="text-sm font-bold text-white">Marie Laurent</p>
                <p className="text-xs text-slate-400">Parisian Florist • A1-A2 Level</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
              Voice Active 🎙️
            </span>
          </div>

          <div className="space-y-3 font-sans">
            <div className="rounded-2xl bg-slate-950 p-3 text-xs text-slate-200 border border-slate-800 space-y-1">
              <p className="font-semibold text-blue-400">Marie:</p>
              <p>"Bonjour ! Bienvenue au café. Qu'est-ce que vous souhaitez commander ?"</p>
            </div>
            <div className="rounded-2xl bg-blue-600/15 p-3 text-xs text-blue-200 border border-blue-500/20 space-y-1 ml-4">
              <p className="font-semibold text-emerald-400">You (Voice):</p>
              <p>"Bonjour Marie ! Je voudrais un café au lait s'il vous plaît."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 2: Personal Notes & Spaced Repetition */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="order-2 lg:order-1 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-purple-400" />
              <span className="text-sm font-bold text-white">Café Vocabulary Notes</span>
            </div>
            <span className="text-xs font-semibold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
              AI Connected
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-mono">
            un café au lait → coffee with milk <br />
            l'addition → the bill <br />
            "Je voudrais l'addition s'il vous plaît"
          </p>
          <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/30 p-3 flex items-center justify-between text-xs">
            <span className="text-indigo-300 font-semibold">✨ "AI, generate quiz from this note"</span>
            <span className="bg-indigo-600 px-3 py-1 rounded-xl text-white font-bold cursor-pointer">Run</span>
          </div>
        </div>

        <div className="order-1 lg:order-2 space-y-4">
          <div className="inline-flex items-center space-x-2 rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-400">
            <Layers className="h-4 w-4" />
            <span>Spaced Repetition & Notes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Your notes are connected to an intelligent memory engine.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Create rich study notes, ask AI to explain tricky grammar, generate instant quiz cards, and let the spaced repetition algorithm automatically surface words you are about to forget.
          </p>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="rounded-3xl border border-blue-500/30 bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 p-8 sm:p-12 text-center space-y-6">
        <h3 className="text-3xl font-extrabold text-white">Ready to live your next language?</h3>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          Start your personalized journey today in French, German, Spanish, Japanese, or Korean.
        </p>
        <Link
          href="/onboarding"
          className="inline-flex items-center space-x-2 rounded-2xl bg-blue-600 px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-blue-500/30 hover:bg-blue-500 transition"
        >
          <span>Get Started Now</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </section>

    </div>
  );
}
