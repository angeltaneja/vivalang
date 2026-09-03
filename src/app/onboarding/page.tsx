'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { SUPPORTED_LANGUAGES } from '@/data/languages';
import { ArrowRight, Check, Sparkles, Clock, Target, Award } from 'lucide-react';
import { CEFRLevel } from '@/types';

export default function OnboardingPage() {
  const router = useRouter();
  const { setCurrentLanguageCode, updateStats } = useApp();

  const [step, setStep] = useState(1);
  const [selectedLang, setSelectedLang] = useState('fr');
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel>('A1');
  const [selectedGoal, setSelectedGoal] = useState('Travel & Vacations');
  const [dailyTarget, setDailyTarget] = useState(15);

  const goals = [
    { label: 'Travel & Vacations', icon: '✈️', desc: 'Order food, book hotels, navigate cities' },
    { label: 'Career & Work', icon: '💼', desc: 'Professional discussions & business network' },
    { label: 'Personal Interest & Hobby', icon: '🧠', desc: 'Brain exercise, culture & literature' },
    { label: 'Moving Abroad / Living', icon: '🏠', desc: 'Daily life, shopping, making local friends' },
  ];

  const handleFinish = () => {
    setCurrentLanguageCode(selectedLang);
    updateStats({
      languageCode: selectedLang,
      cefrLevel: selectedLevel,
    });
    router.push('/home');
  };

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-8">
      
      {/* Progress Bar Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400">
          <span>STEP {step} OF 4</span>
          <span>{step * 25}% COMPLETE</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-900 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
            style={{ width: `${step * 25}%` }}
          />
        </div>
      </div>

      {/* Step 1: Select Language */}
      {step === 1 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-white">Which language do you want to live?</h2>
            <p className="text-sm text-slate-400">Select your primary target language world. You can switch anytime.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLang(lang.code)}
                className={`flex items-start space-x-3 rounded-2xl p-4 text-left transition border ${
                  selectedLang === lang.code
                    ? 'bg-blue-600/15 border-blue-500/50 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/30'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span className="text-3xl">{lang.flag}</span>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-base font-bold text-white">{lang.name}</p>
                    <span className="text-xs text-slate-400">({lang.nativeName})</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{lang.description}</p>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full flex items-center justify-center space-x-2 rounded-2xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-500/25 hover:bg-blue-500 transition"
          >
            <span>Continue</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Step 2: Proficiency Level */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-white">What is your current level?</h2>
            <p className="text-sm text-slate-400">Choose your estimated CEFR starting level.</p>
          </div>

          <div className="space-y-3">
            {[
              { level: 'A1' as CEFRLevel, name: 'Beginner', desc: 'I am starting from complete zero or know basic words (Bonjour, Danke).' },
              { level: 'A2' as CEFRLevel, name: 'Elementary', desc: 'I can form simple sentences and introduce myself.' },
              { level: 'B1' as CEFRLevel, name: 'Intermediate', desc: 'I can hold everyday conversations and travel independently.' },
              { level: 'B2' as CEFRLevel, name: 'Upper Intermediate', desc: 'I can understand complex topics and express thoughts fluently.' },
            ].map((item) => (
              <button
                key={item.level}
                onClick={() => setSelectedLevel(item.level)}
                className={`w-full flex items-start justify-between rounded-2xl p-4 text-left transition border ${
                  selectedLevel === item.level
                    ? 'bg-blue-600/15 border-blue-500/50 ring-1 ring-blue-500/30'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="rounded bg-blue-500/20 px-2 py-0.5 text-xs font-bold text-blue-400">
                      {item.level}
                    </span>
                    <span className="text-sm font-bold text-white">{item.name}</span>
                  </div>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
                {selectedLevel === item.level && <Check className="h-5 w-5 text-blue-400" />}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="w-1/3 rounded-2xl border border-slate-800 bg-slate-900 py-3.5 text-sm font-bold text-slate-300"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="w-2/3 flex items-center justify-center space-x-2 rounded-2xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-500/25"
            >
              <span>Continue</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Primary Goal */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-white">Why are you learning?</h2>
            <p className="text-sm text-slate-400">Your AI tutor will customize scenario recommendations for your goal.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {goals.map((g) => (
              <button
                key={g.label}
                onClick={() => setSelectedGoal(g.label)}
                className={`flex items-start space-x-3 rounded-2xl p-4 text-left transition border ${
                  selectedGoal === g.label
                    ? 'bg-blue-600/15 border-blue-500/50 ring-1 ring-blue-500/30'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span className="text-2xl">{g.icon}</span>
                <div>
                  <p className="text-sm font-bold text-white">{g.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{g.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="w-1/3 rounded-2xl border border-slate-800 bg-slate-900 py-3.5 text-sm font-bold text-slate-300"
            >
              Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="w-2/3 flex items-center justify-center space-x-2 rounded-2xl bg-blue-600 py-3.5 text-sm font-bold text-white"
            >
              <span>Continue</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Daily Commitment */}
      {step === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-white">How much practice each day?</h2>
            <p className="text-sm text-slate-400">Consistency is key to living a language.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[5, 15, 30, 60].map((mins) => (
              <button
                key={mins}
                onClick={() => setDailyTarget(mins)}
                className={`flex flex-col items-center justify-center rounded-2xl p-6 transition border ${
                  dailyTarget === mins
                    ? 'bg-blue-600/20 border-blue-500 text-white ring-1 ring-blue-500/30'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <Clock className="h-6 w-6 text-blue-400 mb-2" />
                <span className="text-xl font-extrabold">{mins} min</span>
                <span className="text-[10px] text-slate-400 mt-1">
                  {mins === 5 ? 'Casual' : mins === 15 ? 'Regular' : mins === 30 ? 'Serious' : 'Intense'}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={handleFinish}
            className="w-full flex items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-base font-bold text-white shadow-xl shadow-blue-500/30 hover:from-blue-500 hover:to-indigo-500 transition"
          >
            <Sparkles className="h-5 w-5" />
            <span>Generate My Personalized Language World</span>
          </button>
        </div>
      )}

    </div>
  );
}
