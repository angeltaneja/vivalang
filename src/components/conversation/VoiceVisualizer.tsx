'use client';

import React from 'react';
import { Mic, BrainCircuit, Volume2 } from 'lucide-react';

export type VoiceState = 'IDLE' | 'LISTENING' | 'THINKING' | 'SPEAKING';

interface VoiceVisualizerProps {
  state: VoiceState;
  onClickMic?: () => void;
}

export function VoiceVisualizer({ state, onClickMic }: VoiceVisualizerProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-6">
      
      {/* Orb container with dynamic animations based on state */}
      <div className="relative flex items-center justify-center">
        
        {/* State Ripple Rings */}
        {state === 'LISTENING' && (
          <>
            <div className="absolute h-32 w-32 rounded-full bg-blue-500/20 animate-ping" />
            <div className="absolute h-40 w-40 rounded-full bg-blue-500/10 animate-pulse" />
          </>
        )}
        {state === 'THINKING' && (
          <>
            <div className="absolute h-36 w-36 rounded-full bg-purple-500/20 animate-spin border border-dashed border-purple-400" />
            <div className="absolute h-44 w-44 rounded-full bg-purple-500/10 animate-pulse" />
          </>
        )}
        {state === 'SPEAKING' && (
          <>
            <div className="absolute h-32 w-32 rounded-full bg-emerald-500/25 animate-ping" />
            <div className="absolute h-40 w-40 rounded-full bg-emerald-500/15 animate-pulse" />
          </>
        )}

        {/* Main Central Orb Button */}
        <button
          onClick={onClickMic}
          disabled={state === 'THINKING'}
          className={`relative z-10 flex h-24 w-24 items-center justify-center rounded-full shadow-2xl transition-all duration-300 ring-4 ${
            state === 'LISTENING'
              ? 'bg-gradient-to-tr from-blue-600 to-cyan-500 ring-blue-400/60 shadow-blue-500/50 scale-110'
              : state === 'THINKING'
              ? 'bg-gradient-to-tr from-purple-600 to-indigo-500 ring-purple-400/60 shadow-purple-500/50 animate-pulse'
              : state === 'SPEAKING'
              ? 'bg-gradient-to-tr from-emerald-600 to-teal-400 ring-emerald-400/60 shadow-emerald-500/50 scale-105'
              : 'bg-slate-900 hover:bg-slate-800 ring-slate-700 shadow-slate-900 hover:scale-105'
          }`}
        >
          {state === 'LISTENING' && <Mic className="h-10 w-10 text-white animate-pulse" />}
          {state === 'THINKING' && <BrainCircuit className="h-10 w-10 text-white animate-spin-slow" />}
          {state === 'SPEAKING' && <Volume2 className="h-10 w-10 text-white animate-bounce" />}
          {state === 'IDLE' && <Mic className="h-10 w-10 text-blue-400" />}
        </button>

      </div>

      {/* State Label & Audio Wave Equalizer Bars */}
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-2">
          {state === 'SPEAKING' && (
            <div className="flex items-end space-x-1 h-5">
              <span className="w-1 bg-emerald-400 h-2 animate-bounce" />
              <span className="w-1 bg-emerald-400 h-5 animate-bounce delay-75" />
              <span className="w-1 bg-emerald-400 h-3 animate-bounce delay-150" />
              <span className="w-1 bg-emerald-400 h-4 animate-bounce delay-100" />
            </div>
          )}
          <span className={`text-sm font-bold tracking-wide uppercase ${
            state === 'LISTENING' ? 'text-blue-400' :
            state === 'THINKING' ? 'text-purple-400' :
            state === 'SPEAKING' ? 'text-emerald-400' :
            'text-slate-400'
          }`}>
            {state === 'LISTENING' ? 'Listening to your voice...' :
             state === 'THINKING' ? 'AI Companion Thinking...' :
             state === 'SPEAKING' ? 'AI Companion Speaking...' :
             'Tap microphone to speak'}
          </span>
        </div>
        <p className="text-xs text-slate-500">
          {state === 'IDLE' ? 'Speech-to-Text & Text-to-Speech active' : 'Hands-free voice recognition connected'}
        </p>
      </div>

    </div>
  );
}
