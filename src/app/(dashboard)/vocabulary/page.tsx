'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { SRSFlashcard } from '@/components/vocabulary/SRSFlashcard';
import { Layers, Sparkles, Volume2, RotateCw, CheckCircle2 } from 'lucide-react';

export default function VocabularyPage() {
  const { currentLanguage, vocabulary, updateVocabMastery } = useApp();

  const langVocab = vocabulary.filter(v => v.languageCode === currentLanguage.code);
  const [activeTab, setActiveTab] = useState<'srs' | 'all'>('srs');
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItem = langVocab[currentIndex] || langVocab[0];

  const handleReview = (delta: number) => {
    if (!currentItem) return;
    const newMastery = Math.min(100, Math.max(0, currentItem.masteryScore + delta));
    updateVocabMastery(currentItem.id, newMastery);

    if (currentIndex < langVocab.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage.code === 'de' ? 'de-DE' : 'fr-FR';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-8 pb-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <Layers className="h-6 w-6 text-purple-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Vocabulary & Spaced Repetition</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Master {langVocab.length} words in {currentLanguage.name} using SM-2 Spaced Repetition logic.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-2xl bg-slate-900 p-1 border border-slate-800 self-start">
          <button
            onClick={() => setActiveTab('srs')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeTab === 'srs' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            SRS Flashcards Review
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeTab === 'all' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Words List
          </button>
        </div>
      </div>

      {/* Mode 1: Interactive SRS Flashcard Review */}
      {activeTab === 'srs' && currentItem && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Reviewing Card {currentIndex + 1} of {langVocab.length}</span>
            <span className="text-purple-400 font-semibold">Priority: Weak Vocabulary First</span>
          </div>

          <SRSFlashcard item={currentItem} onReview={handleReview} />
        </div>
      )}

      {/* Mode 2: Vocabulary Table / Master List */}
      {activeTab === 'all' && (
        <div className="rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Word / Phrase</th>
                  <th className="px-6 py-4">Translation</th>
                  <th className="px-6 py-4">Part of Speech</th>
                  <th className="px-6 py-4">Mastery Score</th>
                  <th className="px-6 py-4 text-right">Audio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {langVocab.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-6 py-4 font-bold text-white">
                      {item.word}
                      <p className="text-[11px] font-mono text-slate-400 font-normal">{item.phonetic}</p>
                    </td>
                    <td className="px-6 py-4 text-blue-400 font-medium">{item.translation}</td>
                    <td className="px-6 py-4 text-slate-400">{item.partOfSpeech}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="h-1.5 w-24 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full ${
                              item.masteryScore > 80 ? 'bg-emerald-400' : item.masteryScore > 50 ? 'bg-amber-400' : 'bg-rose-400'
                            }`}
                            style={{ width: `${item.masteryScore}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-300">{item.masteryScore}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => speak(item.word)}
                        className="rounded-lg bg-slate-800 p-2 text-blue-400 hover:bg-slate-700 transition"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
