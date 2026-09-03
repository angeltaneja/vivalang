'use client';

import React, { useState } from 'react';
import { VocabularyItem } from '@/types';
import { Volume2, RotateCw, CheckCircle2, Sparkles } from 'lucide-react';

interface SRSFlashcardProps {
  item: VocabularyItem;
  onReview: (masteryDelta: number) => void;
}

export function SRSFlashcard({ item, onReview }: SRSFlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = item.languageCode === 'fr' ? 'fr-FR' : item.languageCode === 'de' ? 'de-DE' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto perspective-1000">
      <div
        className={`relative w-full h-80 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 shadow-2xl transition-transform duration-500 transform-style-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front side */}
        <div className="absolute inset-0 flex flex-col items-center justify-between p-8 backface-hidden">
          <div className="w-full flex items-center justify-between">
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20">
              {item.partOfSpeech}
            </span>
            <div className="flex items-center space-x-1">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-bold text-amber-400">{item.masteryScore}% Mastery</span>
            </div>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-4xl font-extrabold tracking-tight text-white">{item.word}</h2>
            <p className="text-sm font-medium text-slate-400 font-mono">{item.phonetic}</p>
          </div>

          <div className="w-full flex items-center justify-between">
            <button
              onClick={(e) => {
                e.stopPropagation();
                speak(item.word);
              }}
              className="flex items-center space-x-1.5 rounded-xl bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition"
            >
              <Volume2 className="h-4 w-4 text-blue-400" />
              <span>Listen</span>
            </button>
            <span className="text-xs text-slate-500 flex items-center space-x-1">
              <RotateCw className="h-3.5 w-3.5" />
              <span>Tap card to reveal</span>
            </span>
          </div>
        </div>

        {/* Back side */}
        <div className="absolute inset-0 flex flex-col items-center justify-between p-8 backface-hidden rotate-y-180 bg-slate-900 rounded-3xl border border-slate-800">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Translation</span>
            <h3 className="text-3xl font-extrabold text-blue-400">{item.translation}</h3>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 w-full text-center space-y-1">
            <p className="text-xs font-medium text-slate-200 italic">"{item.exampleSentence}"</p>
            <p className="text-[11px] text-slate-400">"{item.exampleTranslation}"</p>
          </div>

          {/* Spaced Repetition Buttons */}
          <div className="w-full grid grid-cols-4 gap-1.5 pt-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => onReview(-10)}
              className="rounded-xl bg-rose-500/10 border border-rose-500/20 py-2 text-[11px] font-bold text-rose-400 hover:bg-rose-500/20"
            >
              Again
            </button>
            <button
              onClick={() => onReview(2)}
              className="rounded-xl bg-amber-500/10 border border-amber-500/20 py-2 text-[11px] font-bold text-amber-400 hover:bg-amber-500/20"
            >
              Hard
            </button>
            <button
              onClick={() => onReview(5)}
              className="rounded-xl bg-blue-500/10 border border-blue-500/20 py-2 text-[11px] font-bold text-blue-400 hover:bg-blue-500/20"
            >
              Good
            </button>
            <button
              onClick={() => onReview(10)}
              className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 py-2 text-[11px] font-bold text-emerald-400 hover:bg-emerald-500/20"
            >
              Easy
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
