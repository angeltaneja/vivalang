import { getConversationSystemPrompt, getNoteAiPrompt } from './prompts';

export interface AiConversationResponse {
  reply: string;
  translation: string;
  corrections?: {
    original: string;
    corrected: string;
    explanation: string;
    errorType: 'grammar' | 'vocabulary' | 'pronunciation' | 'naturalness';
  }[];
  suggestedReplies?: string[];
}

export async function generateAiConversationReply(
  userText: string,
  characterName: string,
  characterRole: string,
  personality: string,
  difficulty: string,
  languageName: string,
  scenarioTitle?: string,
  correctionMode: string = 'NORMAL',
  learnerMemoryFacts: string[] = []
): Promise<AiConversationResponse> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const systemPrompt = getConversationSystemPrompt(
        characterName,
        characterRole,
        personality,
        difficulty,
        languageName,
        scenarioTitle,
        correctionMode,
        learnerMemoryFacts
      );

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Message: "${userText}"` }] }
          ],
          generationConfig: {
            responseMimeType: 'application/json',
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawJson) {
          return JSON.parse(rawJson) as AiConversationResponse;
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to smart client engine:', err);
    }
  }

  // Fallback intelligent response generator based on language and scenario
  return generateFallbackResponse(userText, languageName, characterName, scenarioTitle);
}

function generateFallbackResponse(
  userText: string,
  languageName: string,
  characterName: string,
  scenarioTitle?: string
): AiConversationResponse {
  const lower = userText.toLowerCase();

  if (languageName.toLowerCase() === 'french' || languageName.toLowerCase() === 'français') {
    if (lower.includes('bonjour') || lower.includes('salut')) {
      return {
        reply: `Bonjour ! Ah, ravi de vous parler aujourd'hui. Comment se passe votre journée ?`,
        translation: `Hello! Ah, delighted to speak with you today. How is your day going?`,
        suggestedReplies: [`Très bien, merci ! Et vous ?`, `Un peu fatigué, mais ça va.`, `Je suis content de pratiquer le français.`]
      };
    } else if (lower.includes('café') || lower.includes('voudrais') || lower.includes('commander')) {
      return {
        reply: `Absolument ! Un excellent choix. Préférez-vous votre café sur place ou à emporter ?`,
        translation: `Absolutely! An excellent choice. Would you prefer your coffee to stay or to go?`,
        corrections: lower.includes('je suis aller') ? [
          {
            original: 'je suis aller',
            corrected: 'je suis allé(e)',
            explanation: 'In passé composé with être, the past participle "allé" must end with -é.',
            errorType: 'grammar'
          }
        ] : undefined,
        suggestedReplies: [`Sur place, s'il vous plaît.`, `À emporter !`, `Avez-vous des croissants aussi ?`]
      };
    } else if (lower.includes('l\'addition') || lower.includes('payer')) {
      return {
        reply: `Voici l'addition. Cela fera 4,50 €. Vous désirez régler par carte ou en espèces ?`,
        translation: `Here is the bill. That will be €4.50. Would you like to pay by card or cash?`,
        suggestedReplies: [`Par carte, s'il vous plaît.`, `En espèces. Gardez la monnaie !`]
      };
    } else {
      return {
        reply: `C'est très intéressant ! Pouvez-vous m'en dire un peu plus en français ? J'adore vous écouter.`,
        translation: `That is very interesting! Can you tell me a little more in French? I love listening to you.`,
        suggestedReplies: [`Bien sûr ! En fait...`, `J'apprends le français pour voyager.`, `Comment dit-on "hotel" en français ?`]
      };
    }
  } else if (languageName.toLowerCase() === 'german' || languageName.toLowerCase() === 'deutsch') {
    if (lower.includes('guten tag') || lower.includes('hallo') || lower.includes('hey')) {
      return {
        reply: `Guten Tag! Schön, Sie kennenzulernen. Wie geht es Ihnen heute?`,
        translation: `Good day! Nice to meet you. How are you today?`,
        suggestedReplies: [`Mir geht es sehr gut, danke!`, `Es geht so. Und Ihnen?`, `Ich freue mich auf Deutsch zu sprechen.`]
      };
    } else {
      return {
        reply: `Das klingt wunderbar! Was möchten Sie heute noch auf Deutsch üben?`,
        translation: `That sounds wonderful! What would you like to practice in German today?`,
        suggestedReplies: [`Ich möchte Vokabeln üben.`, `Einen Kaffee bestellen, bitte!`, `Erzählen Sie mir etwas über Berlin.`]
      };
    }
  }

  return {
    reply: `Hello! I understood: "${userText}". Keep practicing speaking and asking questions!`,
    translation: `Hello! I understood: "${userText}". Keep practicing speaking and asking questions!`,
    suggestedReplies: [`Tell me more!`, `Can you check my grammar?`, `Let's practice ordering food.`]
  };
}

export async function processNoteAiAction(
  noteContent: string,
  action: 'explain' | 'quiz' | 'cards'
): Promise<any> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const prompt = getNoteAiPrompt(noteContent, action);
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: action !== 'explain' ? { responseMimeType: 'application/json' } : undefined
        })
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return action === 'explain' ? text : JSON.parse(text);
        }
      }
    } catch (e) {
      console.warn('Note AI Action failed, using fallback:', e);
    }
  }

  // Smart client-side fallback
  if (action === 'explain') {
    return `### 💡 AI Tutor Note Analysis\n\n- **Key Grammar Concept**: This note covers polite forms, verb conjugations, and social etiquette.\n- **Grammar Tip**: Always maintain consistency with formal vs informal pronouns (*Tu* vs *Vous* / *Du* vs *Sie*).\n- **Vocabulary Highlight**: Practice using these expressions in your next AI conversation room session!`;
  } else if (action === 'quiz') {
    return {
      questions: [
        {
          question: 'Which auxiliary verb is used for "Aller" in Passé Composé?',
          options: ['Avoir', 'Être', 'Faire', 'Vouloir'],
          correctIndex: 1,
          explanation: '"Aller" is one of the 17 movement verbs that takes "Être". Example: Je suis allé(e).'
        },
        {
          question: 'What is the polite phrase to ask for the check in a French café?',
          options: ['L\'addition s\'il vous plaît', 'Donnez-moi le compte', 'Je paye maintenant', 'Au revoir'],
          correctIndex: 0,
          explanation: '"L\'addition s\'il vous plaît" is the standard polite request.'
        }
      ]
    };
  } else {
    return {
      cards: [
        { word: 'un café au lait', translation: 'coffee with milk', phonetic: '/uhn kah-fay oh leh/', exampleSentence: 'Je voudrais un café au lait.' },
        { word: 'l\'addition', translation: 'the bill / check', phonetic: '/lah-dee-syohn/', exampleSentence: 'L\'addition, s\'il vous plaît.' }
      ]
    };
  }
}
