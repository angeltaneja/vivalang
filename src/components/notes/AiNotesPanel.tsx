'use client';

import React, { useState } from 'react';
import { Note } from '@/types';
import { processNoteAiAction } from '@/lib/ai/gemini';
import { Sparkles, HelpCircle, Layers, CheckCircle2, Loader2, X } from 'lucide-react';

interface AiNotesPanelProps {
  note: Note;
  onClose: () => void;
  onAddGeneratedCards?: (cards: any[]) => void;
}

export function AiNotesPanel({ note, onClose, onAddGeneratedCards }: AiNotesPanelProps) {
  const [loading, setLoading] = useState(false);
  const [resultType, setResultType] = useState<'explain' | 'quiz' | 'cards' | null>(null);
  const [explanation, setExplanation] = useState<string>('');
  const [quizData, setQuizData] = useState<any>(null);
  const [cardsData, setCardsData] = useState<any>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const handleAction = async (action: 'explain' | 'quiz' | 'cards') => {
    setLoading(true);
    setResultType(action);
    try {
      const res = await processNoteAiAction(note.content, action);
      if (action === 'explain') {
        setExplanation(res);
      } else if (action === 'quiz') {
        setQuizData(res);
      } else if (action === 'cards') {
        setCardsData(res);
        if (onAddGeneratedCards && res.cards) {
          onAddGeneratedCards(res.cards);
        }
      }
    } catch (e) {
      console.error('Note AI Action error:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-indigo-500/30 bg-slate-900/95 p-6 shadow-2xl space-y-6 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <h3 className="text-base font-bold text-white">AI Note Assistant</h3>
        </div>
        <button onClick={onClose} className="rounded-full p-1 text-slate-400 hover:text-white">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* AI Actions toolbar */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => handleAction('explain')}
          disabled={loading}
          className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-950 p-3 hover:border-indigo-500/40 hover:bg-slate-900 transition text-center"
        >
          <HelpCircle className="h-5 w-5 text-blue-400 mb-1" />
          <span className="text-xs font-bold text-slate-200">Explain Note</span>
        </button>
        <button
          onClick={() => handleAction('quiz')}
          disabled={loading}
          className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-950 p-3 hover:border-purple-500/40 hover:bg-slate-900 transition text-center"
        >
          <Sparkles className="h-5 w-5 text-purple-400 mb-1" />
          <span className="text-xs font-bold text-slate-200">Create Quiz</span>
        </button>
        <button
          onClick={() => handleAction('cards')}
          disabled={loading}
          className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-950 p-3 hover:border-emerald-500/40 hover:bg-slate-900 transition text-center"
        >
          <Layers className="h-5 w-5 text-emerald-400 mb-1" />
          <span className="text-xs font-bold text-slate-200">Flashcards</span>
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-8 space-y-2 text-indigo-400">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-xs font-semibold">AI is analyzing your note...</p>
        </div>
      )}

      {/* Output results */}
      {!loading && resultType === 'explain' && explanation && (
        <div className="rounded-2xl border border-blue-500/20 bg-blue-950/20 p-4 text-xs text-slate-200 leading-relaxed whitespace-pre-line">
          {explanation}
        </div>
      )}

      {!loading && resultType === 'quiz' && quizData?.questions && (
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400">Generated Quiz</h4>
          {quizData.questions.map((q: any, qIdx: number) => (
            <div key={qIdx} className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-3">
              <p className="text-xs font-bold text-white">{qIdx + 1}. {q.question}</p>
              <div className="space-y-1.5">
                {q.options.map((opt: string, oIdx: number) => {
                  const isSelected = selectedAnswers[qIdx] === oIdx;
                  const isCorrect = q.correctIndex === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => setSelectedAnswers(prev => ({ ...prev, [qIdx]: oIdx }))}
                      className={`w-full text-left rounded-xl px-3 py-2 text-xs transition border ${
                        isSelected
                          ? isCorrect
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {selectedAnswers[qIdx] !== undefined && (
                <p className="text-[11px] text-slate-400 italic pt-1">{q.explanation}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {!loading && resultType === 'cards' && cardsData?.cards && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-400">Flashcards Extracted</span>
            <span className="text-slate-400">Added to SRS Deck</span>
          </div>
          <div className="space-y-2">
            {cardsData.cards.map((card: any, idx: number) => (
              <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950 p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">{card.word}</p>
                  <p className="text-[11px] text-slate-400">{card.translation}</p>
                </div>
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
