'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { FRENCH_LESSONS_UNITS, GERMAN_LESSONS_UNITS } from '@/data/lessonsData';
import { CheckCircle2, Lock, ArrowRight, Sparkles, BookOpen, MessageSquareCode } from 'lucide-react';

export default function LanguageWorldPage() {
  const { currentLanguage, userStats, ui } = useApp();

  const units = currentLanguage.code === 'de' ? GERMAN_LESSONS_UNITS : FRENCH_LESSONS_UNITS;

  return (
    <div className="space-y-8 pb-8">
      
      {/* World Hero Banner */}
      <div className={`relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r ${currentLanguage.bgGradient} p-8 shadow-2xl space-y-4`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-5xl">{currentLanguage.flag}</span>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-3xl font-extrabold text-white">{currentLanguage.name} World</h1>
                <span className="rounded-full bg-blue-500/20 px-3 py-0.5 text-xs font-bold text-blue-400 border border-blue-500/30">
                  {userStats.cefrLevel}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-lg">{currentLanguage.description}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950/60 p-3 rounded-2xl border border-slate-800 text-xs">
            <div>
              <p className="font-bold text-white">{userStats.wordsLearned} Words</p>
              <p className="text-slate-400">Mastered in {currentLanguage.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Path Units */}
      <div className="space-y-6">
        <h2 className="text-lg font-extrabold text-white flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-blue-400" />
          <span>Curriculum Learning Path ({currentLanguage.name})</span>
        </h2>

        <div className="space-y-6">
          {units.map((unit) => (
            <div key={unit.unitNumber} className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-bold text-blue-400 border border-blue-500/20">
                      CEFR {unit.cefrLevel}
                    </span>
                    <h3 className="text-lg font-bold text-white">{unit.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{unit.description}</p>
                </div>
              </div>

              {/* Lesson Nodes Path */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {unit.lessons.map((lesson, lIdx) => (
                  <div
                    key={lesson.id}
                    className="rounded-2xl border border-slate-800 bg-slate-950 p-4 flex items-center justify-between hover:border-blue-500/40 transition group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/15 text-2xl border border-blue-500/20">
                        {lesson.icon}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400">Lesson {lIdx + 1}</p>
                        <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition">
                          {lesson.title}
                        </h4>
                        <p className="text-[11px] text-slate-400">{lesson.estimatedMinutes} min • +{lesson.xpReward} XP</p>
                      </div>
                    </div>

                    <Link
                      href={`/lessons?id=${lesson.id}`}
                      className="rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-500 transition"
                    >
                      Start
                    </Link>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
