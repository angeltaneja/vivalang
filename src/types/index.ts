export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface Language {
  code: string; // 'fr', 'de', 'es', 'ja', 'ko', 'it'
  name: string;
  nativeName: string;
  flag: string;
  themeColor: string; // Tailwind color class or hex
  accentColor: string;
  bgGradient: string;
  description: string;
  supportedLevels: CEFRLevel[];
}

export interface UserLanguageStats {
  languageCode: string;
  cefrLevel: CEFRLevel;
  xp: number;
  streakDays: number;
  totalMinutes: number;
  speakingMinutes: number;
  listeningMinutes: number;
  vocabularyMinutes: number;
  writingMinutes: number;
  wordsLearned: number;
  fluencyRating: number; // 0 - 100
}

export interface ExerciseOption {
  id: string;
  text: string;
  translation?: string;
  isCorrect?: boolean;
}

export type ExerciseType = 
  | 'vocab_match' 
  | 'sentence_build' 
  | 'listening_choice' 
  | 'grammar_select' 
  | 'speaking_pronounce' 
  | 'fill_blank';

export interface Exercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  subPrompt?: string;
  targetSentence?: string;
  options?: ExerciseOption[];
  wordTokens?: string[]; // for sentence_build
  correctAnswer: string | string[];
  explanation: string;
  audioText?: string;
}

export interface LessonUnit {
  unitNumber: number;
  title: string;
  description: string;
  cefrLevel: CEFRLevel;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  courseId: string;
  languageCode: string;
  cefrLevel: CEFRLevel;
  unitNumber: number;
  title: string;
  description: string;
  icon: string;
  estimatedMinutes: number;
  xpReward: number;
  vocabularyList: { word: string; translation: string; phonetic: string }[];
  grammarFocus: { title: string; explanation: string; example: string };
  exercises: Exercise[];
}

export interface AiCharacter {
  id: string;
  languageCode: string;
  name: string;
  avatar: string;
  role: string;
  personality: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  speakingRate: number;
  voiceStyle: string;
  bio: string;
  sampleGreeting: string;
  systemPrompt: string;
  tags: string[];
}

export interface Scenario {
  id: string;
  languageCode: string;
  title: string;
  icon: string;
  category: 'TRAVEL' | 'DAILY' | 'FOOD' | 'WORK' | 'SOCIAL';
  setting: string;
  description: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  initialAiMessage: string;
  userRole: string;
  aiRole: string;
  goals: string[];
}

export type CorrectionMode = 'GENTLE' | 'NORMAL' | 'TEACHER';

export interface MessageCorrection {
  original: string;
  corrected: string;
  explanation: string;
  errorType: 'grammar' | 'vocabulary' | 'pronunciation' | 'naturalness';
}

export interface ConversationMessage {
  id: string;
  sender: 'USER' | 'AI';
  text: string;
  translation?: string;
  audioUrl?: string;
  timestamp: string;
  corrections?: MessageCorrection[];
}

export interface ConversationReport {
  id: string;
  conversationId: string;
  characterName: string;
  scenarioTitle?: string;
  speakingScore: number;
  grammarScore: number;
  vocabScore: number;
  pronunciationScore: number;
  fluencyScore: number;
  newExpressionsLearned: { expression: string; meaning: string }[];
  commonMistakes: MessageCorrection[];
  recommendations: string[];
  date: string;
}

export interface VocabularyItem {
  id: string;
  languageCode: string;
  word: string;
  translation: string;
  phonetic: string;
  partOfSpeech: string;
  exampleSentence: string;
  exampleTranslation: string;
  masteryScore: number; // 0 - 100
  lastReviewedAt: string;
  nextReviewAt: string;
  easeFactor: number;
}

export interface Note {
  id: string;
  languageCode: string;
  title: string;
  category: 'VOCAB' | 'GRAMMAR' | 'CULTURE' | 'CONVERSATION' | 'PERSONAL';
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  current: number;
  target: number;
  unit: 'min' | 'words' | 'lessons' | 'chats';
  xpReward: number;
  completed: boolean;
  actionUrl: string;
}

export interface LearnerMemoryFact {
  id: string;
  category: 'WEAKNESS' | 'STRENGTH' | 'GOAL' | 'PREFERENCE' | 'ERROR_PATTERN';
  fact: string;
  confidence: number;
  updatedAt: string;
}
