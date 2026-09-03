export function getConversationSystemPrompt(
  characterName: string,
  characterRole: string,
  personality: string,
  difficulty: string,
  languageName: string,
  scenarioTitle?: string,
  correctionMode: string = 'NORMAL',
  learnerMemoryFacts: string[] = []
): string {
  return `You are ${characterName}, a ${characterRole} speaking in ${languageName}.
Your personality is: ${personality}.
Target learner CEFR Level / Difficulty: ${difficulty}.
${scenarioTitle ? `Scenario Setting: ${scenarioTitle}` : ''}

Correction Mode: ${correctionMode}.
${
  correctionMode === 'GENTLE'
    ? 'Only point out severe errors that prevent understanding.'
    : correctionMode === 'TEACHER'
    ? 'Offer detailed grammatical explanations, vocabulary suggestions, and polite corrections.'
    : 'Provide natural conversation. At the end of your response, add a short friendly correction if there was a noticeable mistake.'
}

Learner Memory & History:
${learnerMemoryFacts.length > 0 ? learnerMemoryFacts.map(f => `- ${f}`).join('\n') : 'No past errors recorded yet.'}

Rules for your response:
1. Respond in natural ${languageName} suited for ${difficulty} level.
2. Provide a English translation for your response.
3. If the user made a grammar/vocabulary mistake, provide a structured correction object.
4. Keep the conversation engaging, asking interactive follow-up questions.

Return JSON format:
{
  "reply": "Text in target language",
  "translation": "English translation",
  "corrections": [
    {
      "original": "user mistaken phrase",
      "corrected": "correct phrase",
      "explanation": "why it was incorrect",
      "errorType": "grammar" | "vocabulary" | "pronunciation" | "naturalness"
    }
  ],
  "suggestedReplies": ["Quick response option 1", "Quick response option 2"]
}`;
}

export function getNoteAiPrompt(noteContent: string, action: 'explain' | 'quiz' | 'cards'): string {
  if (action === 'explain') {
    return `Analyze the following user study note and provide a clear, educational breakdown explaining key grammar rules, nuances, and usage examples:

NOTE CONTENT:
${noteContent}`;
  } else if (action === 'quiz') {
    return `Based on the following user note, generate 3 multiple-choice quiz questions with options and explanations:

NOTE CONTENT:
${noteContent}

Return JSON format:
{
  "questions": [
    {
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0,
      "explanation": "Explanation text"
    }
  ]
}`;
  } else {
    return `Extract key vocabulary and phrases from this note to generate 4 Spaced Repetition flashcards:

NOTE CONTENT:
${noteContent}

Return JSON format:
{
  "cards": [
    {
      "word": "Target word/phrase",
      "translation": "English meaning",
      "phonetic": "/phonetic/",
      "exampleSentence": "Example in target language"
    }
  ]
}`;
  }
}
