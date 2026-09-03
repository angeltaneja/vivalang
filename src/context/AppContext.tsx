'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, UserLanguageStats, Note, VocabularyItem, CorrectionMode, LearnerMemoryFact } from '@/types';
import { SUPPORTED_LANGUAGES } from '@/data/languages';
import { MOCK_NOTES } from '@/data/notesData';
import { MOCK_USER_VOCABULARY } from '@/data/vocabularyData';
import { IMMERSION_DICTIONARY, UIStrings } from '@/lib/immersion/translationDictionary';

interface AppContextType {
  currentLanguage: Language;
  setCurrentLanguageCode: (code: string) => void;
  immersionMode: boolean;
  setImmersionMode: (val: boolean) => void;
  ui: UIStrings;
  userStats: UserLanguageStats;
  updateStats: (partial: Partial<UserLanguageStats>) => void;
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deleteNote: (id: string) => void;
  vocabulary: VocabularyItem[];
  updateVocabMastery: (id: string, newScore: number) => void;
  correctionMode: CorrectionMode;
  setCorrectionMode: (mode: CorrectionMode) => void;
  learnerMemories: LearnerMemoryFact[];
  addLearnerMemory: (fact: string, category: LearnerMemoryFact['category']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentLangCode, setCurrentLangCode] = useState<string>('fr');
  const [immersionMode, setImmersionMode] = useState<boolean>(false);
  const [correctionMode, setCorrectionMode] = useState<CorrectionMode>('NORMAL');

  const [userStats, setUserStats] = useState<UserLanguageStats>({
    languageCode: 'fr',
    cefrLevel: 'A2',
    xp: 420,
    streakDays: 7,
    totalMinutes: 145,
    speakingMinutes: 45,
    listeningMinutes: 40,
    vocabularyMinutes: 30,
    writingMinutes: 30,
    wordsLearned: 185,
    fluencyRating: 64,
  });

  const [notes, setNotes] = useState<Note[]>(MOCK_NOTES);
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>(MOCK_USER_VOCABULARY);
  const [learnerMemories, setLearnerMemories] = useState<LearnerMemoryFact[]>([
    {
      id: 'mem-1',
      category: 'WEAKNESS',
      fact: 'Often confuses avoir and être auxiliaries in passé composé',
      confidence: 0.9,
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'mem-2',
      category: 'STRENGTH',
      fact: 'Strong pronunciation of French nasal vowels (bonjour, croissant)',
      confidence: 0.85,
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'mem-3',
      category: 'GOAL',
      fact: 'Preparing for upcoming 5-day vacation in Nice & Paris',
      confidence: 0.95,
      updatedAt: new Date().toISOString(),
    },
  ]);

  // Read saved settings from localStorage on mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('vivalang_lang');
      if (savedLang && SUPPORTED_LANGUAGES.some(l => l.code === savedLang)) {
        setCurrentLangCode(savedLang);
      }
      const savedImmersion = localStorage.getItem('vivalang_immersion');
      if (savedImmersion !== null) {
        setImmersionMode(savedImmersion === 'true');
      }
    } catch {
      // ignore SSR/localStorage access error
    }
  }, []);

  const currentLanguage = SUPPORTED_LANGUAGES.find(l => l.code === currentLangCode) || SUPPORTED_LANGUAGES[0];

  const handleSetLanguage = (code: string) => {
    setCurrentLangCode(code);
    setUserStats(prev => ({ ...prev, languageCode: code }));
    try {
      localStorage.setItem('vivalang_lang', code);
    } catch {}
  };

  const handleSetImmersion = (val: boolean) => {
    setImmersionMode(val);
    try {
      localStorage.setItem('vivalang_immersion', String(val));
    } catch {}
  };

  const updateStats = (partial: Partial<UserLanguageStats>) => {
    setUserStats(prev => ({ ...prev, ...partial }));
  };

  const addNote = (newNoteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newNote: Note = {
      ...newNoteData,
      id: `note-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const updateVocabMastery = (id: string, newScore: number) => {
    setVocabulary(prev =>
      prev.map(item => (item.id === id ? { ...item, masteryScore: newScore } : item))
    );
  };

  const addLearnerMemory = (fact: string, category: LearnerMemoryFact['category']) => {
    setLearnerMemories(prev => [
      {
        id: `mem-${Date.now()}`,
        category,
        fact,
        confidence: 0.88,
        updatedAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const currentDictKey = immersionMode ? currentLanguage.code : 'en';
  const ui = IMMERSION_DICTIONARY[currentDictKey] || IMMERSION_DICTIONARY['en'];

  return (
    <AppContext.Provider
      value={{
        currentLanguage,
        setCurrentLanguageCode: handleSetLanguage,
        immersionMode,
        setImmersionMode: handleSetImmersion,
        ui,
        userStats,
        updateStats,
        notes,
        addNote,
        deleteNote,
        vocabulary,
        updateVocabMastery,
        correctionMode,
        setCorrectionMode,
        learnerMemories,
        addLearnerMemory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
