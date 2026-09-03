'use client';

import React from 'react';
import { CorrectionMode } from '@/types';
import { Sparkles, ShieldCheck, GraduationCap } from 'lucide-react';

interface ModeToggleProps {
  currentMode: CorrectionMode;
  onSelectMode: (mode: CorrectionMode) => void;
}

export function ModeToggle({ currentMode, onSelectMode }: ModeToggleProps) {
  const modes: { mode: CorrectionMode; label: string; icon: any; desc: string }[] = [
    {
      mode: 'GENTLE',
      label: 'Gentle',
      icon: Sparkles,
      desc: 'Only major errors corrected',
    },
    {
      mode: 'NORMAL',
      label: 'Normal',
      icon: ShieldCheck,
      desc: 'Natural flow with corrections after speaking',
    },
    {
      mode: 'TEACHER',
      label: 'Teacher',
      icon: GraduationCap,
      desc: 'Detailed grammar tips & full breakdowns',
    },
  ];

  return (
    <div className="flex items-center space-x-1 rounded-2xl bg-slate-900/90 p-1 border border-slate-800">
      {modes.map(({ mode, label, icon: Icon, desc }) => {
        const isSelected = currentMode === mode;

        return (
          <button
            key={mode}
            onClick={() => onSelectMode(mode)}
            title={desc}
            className={`flex items-center space-x-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
              isSelected
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
