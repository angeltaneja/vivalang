# VivaLang — Technical Interview Cheat Sheet & Architecture Guide

> **Core Philosophy**: *"Don't just study a language. Live it."*

Use this guide to confidently present **VivaLang** in technical interviews, system design discussions, and project showcases.

---

## 🎯 1. The 30-Second Elevator Pitch

> *"VivaLang is a full-stack AI-powered language-learning platform designed to replace generic chatbot wrappers with immersive, data-driven language worlds. Instead of a basic chat box, users explore structured CEFR-aligned curriculums, engage in real-time voice conversations with distinct AI personalities, practice real-world roleplay scenarios (e.g., ordering coffee in Paris or hotel check-in), review vocabulary via SM-2 Spaced Repetition, and use an AI-assisted notes workspace. The platform dynamically adapts to the learner's mistakes and includes an Immersion Mode that gradually shifts the UI into the target language."*

---

## 🏗️ 2. High-Level Architecture Overview

- **Frontend**: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS
- **State Management**: AppContext with localStorage persistence & Immersion i18n
- **AI Core**: Gemini 1.5 Flash API with structured JSON output + smart client fallback
- **Voice Pipeline**: Web Speech API (`SpeechRecognition` STT + `SpeechSynthesis` TTS) with 4-state visual waveform (`IDLE`, `LISTENING`, `THINKING`, `SPEAKING`)
- **Database & ORM**: PostgreSQL / SQLite via Prisma ORM
- **Algorithm**: SM-2 Spaced Repetition for adaptive vocabulary flashcards

---

## 💻 3. Tech Stack & Engineering Justifications

When asked *"Why did you choose this tech stack?"*, use these points:

| Technology | Role | Why It Was Chosen |
|---|---|---|
| **Next.js 16 (App Router)** | Framework | Server Components for fast initial render, client hydration, and built-in API route handlers. |
| **TypeScript (v5)** | Language | Strict type safety across database schemas, AI JSON payloads, exercise models, and UI props. |
| **Tailwind CSS (v4)** | Styling | Rapid utility-first styling with custom glassmorphism, dark themes, and dynamic layout bounds. |
| **Gemini 1.5 Flash LLM** | AI Core | Low-latency structured JSON generation for roleplay dialogue, grammar corrections, and note quizzes. |
| **Web Speech API** | Voice Engine | Native browser SpeechRecognition (STT) and SpeechSynthesis (TTS) providing zero-cost voice interaction. |
| **Prisma ORM** | Database Layer | Type-safe database modeling users, multi-language progress, SRS cards, and conversation feedback. |
| **Framer Motion & Confetti** | Micro-interactions | Visual delight, smooth state transitions, audio waveforms, and reward celebrations. |

---

## 🔬 4. How Key Features Work Under the Hood

### A. Real-Time AI Voice Conversation & Waveform Pipeline
1. **Audio Capture**: User taps microphone orb (`VoiceVisualizer.tsx`). Browser `webkitSpeechRecognition` captures real-time speech.
2. **State Machine**:
   - `IDLE`: Ready state.
   - `LISTENING` 🎙️: Animated blue pulse ring during voice capture.
   - `THINKING` 🤔: Purple spinning halo while sending payload to Gemini API.
   - `SPEAKING` 🔊: Green bouncing equalizer bars while audio synthesis plays.
3. **Context-Aware Prompt Engineering**: Payload sent to LLM includes:
   - AI Character Persona (e.g. *Marie Laurent*, Paris florist, slow speech).
   - Selected Scenario (e.g. *Ordering Coffee*).
   - Selected Correction Mode (**Gentle**, **Normal**, **Teacher**).
   - Learner Memory Facts (e.g. *"User confuses avoir/être"*).
4. **Structured Output**: Gemini responds with JSON containing target language reply, translation, grammar corrections array, and suggested replies.
5. **Post-Conversation Report**: Computes scores for Speaking %, Grammar %, Vocab %, and Pronunciation %, surfacing key mistakes and next action plans.

---

### B. Dynamic Immersion Mode (UI Shift)
- Managed via `AppContext.tsx` and `translationDictionary.ts`.
- Toggling the Globe 🌐 button updates `immersionMode`. When active, UI string labels (e.g. *Home* -> *Accueil*, *Lessons* -> *Leçons*, *Notes* -> *Mes Notes*) instantly re-render in the target language.

---

### C. Data-Driven Curriculum & Interactive Lesson Engine
- Lessons are structured as JSON data (`lessonsData.ts`), supporting easy extension.
- 5 Exercise Types: Sentence Builder (token clicking), Vocab Match, Grammar Select, Fill-in-the-Blank, and Speaking Pronunciation.
- Reaching 100% fires `canvas-confetti` and awards +50 XP.

---

### D. Spaced Repetition System (SRS)
- Implements SM-2 algorithm (`SRSFlashcard.tsx`).
- Mastery scoring (0-100%) updated via 4 review buttons (*Again*, *Hard*, *Good*, *Easy*).
- Weak words (< 50% mastery) automatically placed first in daily review queues.

---

### E. Personal Notes Workspace & AI Assistant
- Storage in Markdown notes (`VOCAB`, `GRAMMAR`, `CULTURE`, `PERSONAL`).
- AI Drawer Actions (`AiNotesPanel.tsx`):
  - **Explain Note**: Deep educational breakdown of grammar rules.
  - **Create Quiz**: Generates interactive multiple-choice questions.
  - **Generate Flashcards**: Parses vocabulary and adds cards to SRS deck.

---

## ❓ 5. Top Interview Questions & Bulletproof Answers

### Q1: "How did you design the AI system to avoid looking like a generic ChatGPT wrapper?"
> **Answer**: *"We decoupled AI from a simple chat box. AI is modularized into specialized services: a Character Roleplay engine with distinct voice rates, a Correction Engine supporting Gentle/Normal/Teacher modes, a Lesson Generator, and a Note Assistant. The AI receives structured learner memory (past errors, current CEFR level, goals) so every interaction feels like a personalized tutor who knows your history."*

---

### Q2: "How do you handle latency during voice conversations?"
> **Answer**: *"We combined client-side browser Web Speech APIs with low-latency LLM streaming. Speech-to-Text runs locally in browser C++, reducing input latency to zero. Text-to-speech synthesis plays as soon as response bytes are received. We also provide clear UI feedback using a 4-state visualizer (Listening, Thinking, Speaking)."*

---

### Q3: "How does the app scale to support new languages like Japanese or Spanish?"
> **Answer**: *"Languages are represented as structured data contracts (`Language`, `LessonUnit`, `AiCharacter`, `Scenario`). Adding Spanish or Japanese requires zero code changes to the UI or AI engines—we simply register a new language entry in `SUPPORTED_LANGUAGES` with its flag, characters, and curriculum JSON files."*

---

## 📊 Quick Summary Checklist

- [x] **Project Name**: VivaLang
- [x] **Tagline**: *"Don't just study a language. Live it."*
- [x] **Tech Stack**: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, Gemini API, Web Speech API, Prisma ORM.
- [x] **Key Differentiator**: Immersive travel/game design with data-driven UI, NOT a generic ChatGPT box.
