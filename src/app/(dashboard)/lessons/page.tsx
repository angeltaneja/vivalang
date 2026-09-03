'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { FRENCH_LESSONS_UNITS, GERMAN_LESSONS_UNITS } from '@/data/lessonsData';
import { Exercise } from '@/types';
import confetti from 'canvas-confetti';
import { Volume2, CheckCircle2, ArrowRight, XCircle, Sparkles, BookOpen, RotateCw, Loader2 } from 'lucide-react';

function LessonContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { currentLanguage, updateStats } = useApp();

  const lessonId = searchParams.get('id') || 'fr-unit1-lesson1';
  const units = currentLanguage.code === 'de' ? GERMAN_LESSONS_UNITS : FRENCH_LESSONS_UNITS;
  const currentLesson = units.flatMap(u => u.lessons).find(l => l.id === lessonId) || units[0].lessons[0];

  const [step, setStep] = useState<'vocab' | 'grammar' | 'exercise' | 'completed'>('vocab');
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [builtTokens, setBuiltTokens] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [score, setScore] = useState(0);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage.code === 'de' ? 'de-DE' : 'fr-FR';
      window.speechSynthesis.speak(utterance);
    }
  };

  const currentExercise = currentLesson.exercises[currentExerciseIdx];

  const handleCheckAnswer = () => {
    if (!currentExercise) return;

    let isCorrect = false;
    if (currentExercise.type === 'vocab_match' || currentExercise.type === 'grammar_select' || currentExercise.type === 'fill_blank') {
      isCorrect = selectedOption === currentExercise.correctAnswer;
    } else if (currentExercise.type === 'sentence_build') {
      const targetStr = Array.isArray(currentExercise.correctAnswer)
        ? currentExercise.correctAnswer.join(' ')
        : currentExercise.correctAnswer;
      isCorrect = builtTokens.join(' ') === targetStr;
    } else if (currentExercise.type === 'speaking_pronounce') {
      isCorrect = true; // Speech recognition simulation
    }

    if (isCorrect) {
      setScore(prev => prev + 1);
      setFeedback({ isCorrect: true, text: `Excellent! ${currentExercise.explanation}` });
    } else {
      setFeedback({ isCorrect: false, text: `Not quite. ${currentExercise.explanation}` });
    }
  };

  const handleNextExercise = () => {
    setFeedback(null);
    setSelectedOption(null);
    setBuiltTokens([]);

    if (currentExerciseIdx < currentLesson.exercises.length - 1) {
      setCurrentExerciseIdx(prev => prev + 1);
    } else {
      setStep('completed');
      updateStats({ xp: 50, wordsLearned: 5 });
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch {}
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-4 space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{currentLesson.icon}</span>
          <div>
            <h1 className="text-lg font-bold text-white">{currentLesson.title}</h1>
            <p className="text-xs text-slate-400">Unit {currentLesson.unitNumber} • {currentLanguage.name}</p>
          </div>
        </div>
        <Link href="/world" className="text-xs font-semibold text-slate-400 hover:text-white">
          Exit Lesson ✕
        </Link>
      </div>

      {/* Step 1: Vocabulary Overview */}
      {step === 'vocab' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-white">Lesson Vocabulary</h2>
            <p className="text-xs text-slate-400">Listen to the words and study their translations before practicing.</p>
          </div>

          <div className="space-y-3">
            {currentLesson.vocabularyList.map((item, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900 p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-base font-bold text-white">{item.word}</p>
                    <span className="text-xs font-mono text-slate-400">[{item.phonetic}]</span>
                  </div>
                  <p className="text-xs text-blue-400 font-medium">{item.translation}</p>
                </div>
                <button
                  onClick={() => speak(item.word)}
                  className="rounded-xl bg-slate-800 p-2.5 text-blue-400 hover:bg-slate-700 transition"
                >
                  <Volume2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => setStep('grammar')}
            className="w-full flex items-center justify-center space-x-2 rounded-2xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-500/25 hover:bg-blue-500 transition"
          >
            <span>Next: Grammar Focus</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Step 2: Grammar Focus */}
      {step === 'grammar' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/40 to-slate-900 p-6 space-y-4">
            <div className="flex items-center space-x-2 text-indigo-400">
              <BookOpen className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Grammar Insight</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">{currentLesson.grammarFocus.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{currentLesson.grammarFocus.explanation}</p>
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs font-semibold text-slate-400">Example:</p>
              <p className="text-sm font-bold text-emerald-400 font-sans">{currentLesson.grammarFocus.example}</p>
            </div>
          </div>

          <button
            onClick={() => setStep('exercise')}
            className="w-full flex items-center justify-center space-x-2 rounded-2xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-500/25 hover:bg-blue-500 transition"
          >
            <span>Start Practice Exercises ({currentLesson.exercises.length})</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Step 3: Interactive Exercises */}
      {step === 'exercise' && currentExercise && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Progress bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span>EXERCISE {currentExerciseIdx + 1} OF {currentLesson.exercises.length}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-900 overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${((currentExerciseIdx + 1) / currentLesson.exercises.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-white">{currentExercise.prompt}</h2>
            {currentExercise.subPrompt && (
              <p className="text-xs text-slate-400">{currentExercise.subPrompt}</p>
            )}
          </div>

          {/* Type 1: Sentence Build */}
          {currentExercise.type === 'sentence_build' && (
            <div className="space-y-4">
              <div className="min-h-16 rounded-2xl border border-slate-800 bg-slate-950 p-4 flex flex-wrap gap-2 items-center">
                {builtTokens.map((tok, i) => (
                  <button
                    key={i}
                    onClick={() => setBuiltTokens(prev => prev.filter((_, idx) => idx !== i))}
                    className="rounded-xl bg-blue-600 px-3 py-1.5 text-sm font-bold text-white shadow"
                  >
                    {tok}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {currentExercise.wordTokens?.map((tok, i) => (
                  <button
                    key={i}
                    onClick={() => setBuiltTokens(prev => [...prev, tok])}
                    className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-sm font-semibold text-slate-200 hover:bg-slate-800"
                  >
                    {tok}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Type 2: Options Selection (Grammar, Vocab Match, Fill Blank) */}
          {(currentExercise.type === 'vocab_match' || currentExercise.type === 'grammar_select' || currentExercise.type === 'fill_blank') && (
            <div className="space-y-2">
              {currentExercise.options?.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedOption(opt.id || opt.text)}
                  className={`w-full flex items-center justify-between rounded-2xl p-4 text-left transition border ${
                    selectedOption === (opt.id || opt.text)
                      ? 'bg-blue-600/20 border-blue-500 text-white ring-1 ring-blue-500/30'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-sm font-bold">{opt.text}</span>
                  {opt.translation && <span className="text-xs text-slate-400">{opt.translation}</span>}
                </button>
              ))}
            </div>
          )}

          {/* Type 3: Speaking Pronunciation Practice */}
          {currentExercise.type === 'speaking_pronounce' && (
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-center space-y-4">
              <p className="text-2xl font-black text-blue-400 font-sans">"{currentExercise.targetSentence}"</p>
              <button
                onClick={() => speak(currentExercise.targetSentence || '')}
                className="inline-flex items-center space-x-2 rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
              >
                <Volume2 className="h-4 w-4 text-blue-400" />
                <span>Listen Native Pronunciation</span>
              </button>
            </div>
          )}

          {/* Feedback banner */}
          {feedback && (
            <div className={`rounded-2xl p-4 flex items-start space-x-3 border ${
              feedback.isCorrect
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
            }`}>
              {feedback.isCorrect ? <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" /> : <XCircle className="h-5 w-5 shrink-0 mt-0.5" />}
              <p className="text-xs font-semibold">{feedback.text}</p>
            </div>
          )}

          {/* Action buttons */}
          {!feedback ? (
            <button
              onClick={handleCheckAnswer}
              className="w-full rounded-2xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-500/25 hover:bg-blue-500 transition"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNextExercise}
              className="w-full rounded-2xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-xl shadow-emerald-500/25 hover:bg-emerald-500 transition"
            >
              Continue Next →
            </button>
          )}

        </div>
      )}

      {/* Step 4: Lesson Completion Celebration */}
      {step === 'completed' && (
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center space-y-6 animate-fadeIn">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mx-auto ring-4 ring-emerald-500/30">
            <Sparkles className="h-10 w-10 animate-bounce" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-white">Lesson Complete! 🎉</h2>
            <p className="text-sm text-slate-300">You earned +50 XP and mastered new vocabulary!</p>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-2xl font-black text-amber-400">+50 XP</p>
              <p className="text-xs text-slate-400">Earned</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-2xl font-black text-blue-400">{score} / {currentLesson.exercises.length}</p>
              <p className="text-xs text-slate-400">Accuracy</p>
            </div>
          </div>

          <Link
            href="/world"
            className="inline-flex w-full items-center justify-center space-x-2 rounded-2xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-500/25 hover:bg-blue-500 transition"
          >
            <span>Return to Language World</span>
          </Link>
        </div>
      )}

    </div>
  );
}

export default function LessonPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-20 space-y-3 text-blue-400">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-xs font-semibold">Loading interactive lesson engine...</p>
      </div>
    }>
      <LessonContent />
    </Suspense>
  );
}
