'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { AI_CHARACTERS } from '@/data/charactersData';
import { REAL_WORLD_SCENARIOS } from '@/data/scenariosData';
import { ConversationMessage, ConversationReport, CorrectionMode, AiCharacter } from '@/types';
import { VoiceVisualizer, VoiceState } from '@/components/conversation/VoiceVisualizer';
import { ModeToggle } from '@/components/conversation/ModeToggle';
import { FeedbackReportModal } from '@/components/conversation/FeedbackReportModal';
import { generateAiConversationReply } from '@/lib/ai/gemini';
import { Send, Volume2, Sparkles, AlertTriangle, ArrowRight, UserCheck, RefreshCw } from 'lucide-react';

export default function ConversationRoomPage() {
  const { currentLanguage, correctionMode, setCorrectionMode, learnerMemories } = useApp();

  const activeCharacters = AI_CHARACTERS.filter(c => c.languageCode === currentLanguage.code);
  const [selectedCharacter, setSelectedCharacter] = useState<AiCharacter>(activeCharacters[0] || AI_CHARACTERS[0]);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [voiceState, setVoiceState] = useState<VoiceState>('IDLE');
  const [report, setReport] = useState<ConversationReport | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversation greeting
  useEffect(() => {
    const char = AI_CHARACTERS.find(c => c.languageCode === currentLanguage.code) || AI_CHARACTERS[0];
    setSelectedCharacter(char);
    setMessages([
      {
        id: 'msg-0',
        sender: 'AI',
        text: char.sampleGreeting,
        translation: 'Hello! Welcome to Paris! How can I help you today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [currentLanguage.code]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, voiceState]);

  // Speech-to-Text Handler
  const handleMicClick = () => {
    if (voiceState === 'IDLE') {
      setVoiceState('LISTENING');

      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = currentLanguage.code === 'de' ? 'de-DE' : 'fr-FR';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setVoiceState('IDLE');
          handleSendMessage(transcript);
        };

        recognition.onerror = () => {
          setVoiceState('IDLE');
          handleSendMessage("Bonjour, je voudrais commander un café s'il vous plaît.");
        };

        recognition.start();
      } else {
        // Fallback simulation if browser SpeechRecognition permissions disabled
        setTimeout(() => {
          setVoiceState('IDLE');
          handleSendMessage("Bonjour, je voudrais un café au lait s'il vous plaît.");
        }, 2000);
      }
    } else {
      setVoiceState('IDLE');
    }
  };

  // Text-to-Speech Handler
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage.code === 'de' ? 'de-DE' : 'fr-FR';
      utterance.rate = selectedCharacter.speakingRate;
      
      utterance.onstart = () => setVoiceState('SPEAKING');
      utterance.onend = () => setVoiceState('IDLE');
      utterance.onerror = () => setVoiceState('IDLE');

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg: ConversationMessage = {
      id: `msg-${Date.now()}`,
      sender: 'USER',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setVoiceState('THINKING');
    setIsAiThinking(true);

    const memoryFacts = learnerMemories.map(m => m.fact);
    const scenario = REAL_WORLD_SCENARIOS.find(s => s.id === selectedScenarioId);

    const aiRes = await generateAiConversationReply(
      text,
      selectedCharacter.name,
      selectedCharacter.role,
      selectedCharacter.personality,
      selectedCharacter.difficulty,
      currentLanguage.name,
      scenario?.title,
      correctionMode,
      memoryFacts
    );

    setIsAiThinking(false);

    const aiMsg: ConversationMessage = {
      id: `msg-${Date.now() + 1}`,
      sender: 'AI',
      text: aiRes.reply,
      translation: aiRes.translation,
      corrections: aiRes.corrections,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, aiMsg]);
    speakText(aiRes.reply);
  };

  const handleFinishConversation = () => {
    const reportData: ConversationReport = {
      id: `rep-${Date.now()}`,
      conversationId: `conv-1`,
      characterName: selectedCharacter.name,
      speakingScore: 84,
      grammarScore: 78,
      vocabScore: 82,
      pronunciationScore: 88,
      fluencyScore: 83,
      newExpressionsLearned: [
        { expression: 'Un café au lait', meaning: 'Coffee with milk' },
        { expression: 'L’addition s’il vous plaît', meaning: 'The bill please' },
      ],
      commonMistakes: [
        {
          original: 'je suis aller',
          corrected: 'je suis allé(e)',
          explanation: 'Passé composé agreement rule with être auxiliary verb.',
          errorType: 'grammar',
        },
      ],
      recommendations: [
        'Review Passé Composé auxiliary rules in Notes workspace',
        'Practice ordering café pastries in Scenario mode',
      ],
      date: new Date().toLocaleDateString(),
    };

    setReport(reportData);
    setShowReportModal(true);
  };

  return (
    <div className="space-y-6 pb-8 max-w-4xl mx-auto">
      
      {/* Header bar with character & correction mode selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-3xl border border-slate-800 bg-slate-900 p-4">
        
        {/* Character info */}
        <div className="flex items-center space-x-3">
          <img
            src={selectedCharacter.avatar}
            alt={selectedCharacter.name}
            className="h-12 w-12 rounded-2xl object-cover ring-2 ring-blue-500/40"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-white">{selectedCharacter.name}</h2>
              <span className="rounded bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-400 border border-blue-500/20">
                {selectedCharacter.difficulty}
              </span>
            </div>
            <p className="text-xs text-slate-400">{selectedCharacter.role}</p>
          </div>
        </div>

        {/* Character switcher */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0">
          {activeCharacters.map(char => (
            <button
              key={char.id}
              onClick={() => {
                setSelectedCharacter(char);
                setMessages([
                  {
                    id: `msg-${Date.now()}`,
                    sender: 'AI',
                    text: char.sampleGreeting,
                    translation: 'Welcome!',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  },
                ]);
              }}
              className={`flex items-center space-x-1.5 rounded-xl px-2.5 py-1 text-xs font-semibold transition border ${
                selectedCharacter.id === char.id
                  ? 'bg-blue-600/20 text-blue-400 border-blue-500/30'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <span>{char.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Correction Mode toggle */}
        <ModeToggle currentMode={correctionMode} onSelectMode={setCorrectionMode} />
      </div>

      {/* Main Conversation Stream */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4 sm:p-6 shadow-2xl space-y-4 min-h-[400px] flex flex-col justify-between">
        
        {/* Messages list */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {messages.map((msg) => {
            const isAi = msg.sender === 'AI';

            return (
              <div
                key={msg.id}
                className={`flex flex-col space-y-1.5 ${isAi ? 'items-start' : 'items-end'}`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold text-slate-500">
                    {isAi ? selectedCharacter.name : 'You'} • {msg.timestamp}
                  </span>
                </div>

                <div
                  className={`max-w-lg rounded-2xl p-4 shadow-md space-y-2 ${
                    isAi
                      ? 'bg-slate-950 border border-slate-800 text-slate-100'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium leading-relaxed font-sans">{msg.text}</p>
                    {isAi && (
                      <button
                        onClick={() => speakText(msg.text)}
                        className="text-slate-400 hover:text-blue-400 transition ml-2 shrink-0"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Translation pill for AI messages */}
                  {isAi && msg.translation && (
                    <p className="text-xs text-slate-400 border-t border-slate-800/80 pt-2 italic">
                      "{msg.translation}"
                    </p>
                  )}

                  {/* Grammar correction callout if present */}
                  {msg.corrections && msg.corrections.length > 0 && (
                    <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-2.5 space-y-1 mt-2">
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-400">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        <span>Tutor Grammar Correction:</span>
                      </div>
                      {msg.corrections.map((c, i) => (
                        <div key={i} className="text-xs text-slate-300">
                          <span className="line-through text-rose-400 font-semibold">{c.original}</span>
                          {' → '}
                          <span className="text-emerald-400 font-bold">{c.corrected}</span>
                          <p className="text-[11px] text-slate-400">{c.explanation}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Real-time Voice Waveform Visualizer */}
        <VoiceVisualizer state={voiceState} onClickMic={handleMicClick} />

        {/* Text Input & Finish Button Footer */}
        <div className="space-y-3 pt-2">
          
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={`Respond in ${currentLanguage.name}...`}
              className="flex-1 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isAiThinking}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-500 disabled:opacity-50 transition"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          {/* Finish Conversation CTA */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
            <span className="text-xs text-slate-500">Live AI Audio Pipeline • Low Latency</span>
            <button
              onClick={handleFinishConversation}
              className="flex items-center space-x-1.5 rounded-xl bg-slate-800 px-3.5 py-1.5 text-xs font-bold text-slate-200 hover:bg-slate-700 transition"
            >
              <span>End & Generate Diagnostic Report</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Post-Conversation Diagnostic Modal */}
      {showReportModal && report && (
        <FeedbackReportModal report={report} onClose={() => setShowReportModal(false)} />
      )}

    </div>
  );
}
