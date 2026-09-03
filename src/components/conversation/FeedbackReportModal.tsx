'use client';

import React from 'react';
import { ConversationReport } from '@/types';
import { Award, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, X } from 'lucide-react';

interface FeedbackReportModalProps {
  report: ConversationReport;
  onClose: () => void;
}

export function FeedbackReportModal({ report, onClose }: FeedbackReportModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-lg shadow-emerald-500/30">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-bold text-white">Conversation Performance Report</h3>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-400 ring-1 ring-emerald-500/30">
                  Passed
                </span>
              </div>
              <p className="text-xs text-slate-400">Partner: {report.characterName} • {report.date}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 4 Diagnostic Score Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-2xl border border-blue-500/20 bg-blue-950/20 p-3 text-center">
            <p className="text-2xl font-black text-blue-400">{report.speakingScore}%</p>
            <p className="text-xs font-medium text-slate-400">Speaking</p>
          </div>
          <div className="rounded-2xl border border-purple-500/20 bg-purple-950/20 p-3 text-center">
            <p className="text-2xl font-black text-purple-400">{report.grammarScore}%</p>
            <p className="text-xs font-medium text-slate-400">Grammar</p>
          </div>
          <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-3 text-center">
            <p className="text-2xl font-black text-amber-400">{report.vocabScore}%</p>
            <p className="text-xs font-medium text-slate-400">Vocabulary</p>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-3 text-center">
            <p className="text-2xl font-black text-emerald-400">{report.pronunciationScore}%</p>
            <p className="text-xs font-medium text-slate-400">Pronunciation</p>
          </div>
        </div>

        {/* New Expressions Learned */}
        <div className="space-y-2">
          <h4 className="flex items-center space-x-2 text-sm font-bold text-slate-200">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span>New Expressions Mastered</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {report.newExpressionsLearned.map((expr, i) => (
              <div key={i} className="rounded-xl border border-slate-800 bg-slate-950 p-3 flex items-start space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white">{expr.expression}</p>
                  <p className="text-[11px] text-slate-400">{expr.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistakes & Corrections */}
        {report.commonMistakes.length > 0 && (
          <div className="space-y-2">
            <h4 className="flex items-center space-x-2 text-sm font-bold text-slate-200">
              <AlertTriangle className="h-4 w-4 text-rose-400" />
              <span>Key Mistakes Analyzed</span>
            </h4>
            <div className="space-y-2">
              {report.commonMistakes.map((mistake, i) => (
                <div key={i} className="rounded-xl border border-rose-500/20 bg-rose-950/10 p-3 space-y-1">
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-rose-400 line-through">"{mistake.original}"</span>
                    <ArrowRight className="h-3 w-3 text-slate-500" />
                    <span className="text-emerald-400 font-bold">"{mistake.corrected}"</span>
                  </div>
                  <p className="text-[11px] text-slate-300">{mistake.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Tutor Recommendations */}
        <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 to-slate-900 p-4 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Next Action Plan</h4>
          <ul className="space-y-1">
            {report.recommendations.map((rec, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action button */}
        <button
          onClick={onClose}
          className="w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-500 transition"
        >
          Save to Learning Progress & Continue
        </button>

      </div>
    </div>
  );
}
