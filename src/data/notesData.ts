import { Note } from '@/types';

export const MOCK_NOTES: Note[] = [
  {
    id: 'note-1',
    languageCode: 'fr',
    title: '☕ Café Vocabulary & Ordering Etiquette in France',
    category: 'VOCAB',
    content: `# French Café Culture & Expressions

Ordering coffee in Paris requires a few subtle rules to sound polite and natural!

## Core Drinks
- **Un café / Un espresso** → Single shot of black espresso
- **Un café au lait** → Coffee with warm milk (usually served in a bowl at breakfast)
- **Un allongé** → Espresso diluted with hot water (similar to Americano)
- **Une noisette** → Espresso with a small dash of milk foam

## Essential Phrases
1. *Bonjour ! Je voudrais un café au lait s’il vous plaît.*
2. *Est-ce que je peux avoir l’addition ?*
3. *Garder la monnaie.* (Keep the change)

> **Pro Tip**: Always greet the waiter with "Bonjour" BEFORE placing your order. Jumping straight into "Un café!" can be considered impolite.`,
    createdAt: '2026-08-28T14:20:00Z',
    updatedAt: '2026-09-01T16:45:00Z',
    tags: ['Café', 'Paris', 'Ordering', 'A1-A2'],
  },
  {
    id: 'note-2',
    languageCode: 'fr',
    title: '⚠️ Past Tense Pitfall: Avoir vs. Être in Passé Composé',
    category: 'GRAMMAR',
    content: `# Passé Composé Auxiliary Verbs

Most French verbs use **avoir** as the auxiliary verb in passé composé.
However, 17 specific movement and reflexive verbs use **être**!

## Verbs using Être (DR & MRS VANDERTRAMPP)
- **Devenir** → Devenu
- **Revenir** → Revenu
- **Monter** → Monté
- **Rester** → Resté
- **Sortir** → Sorti
- **Venir** → Venu
- **Aller** → Allé (*Je suis allé au restaurant*)
- **Naître** → Né
- **Descendre** → Descendu
- **Entrer** → Entré
- **Rentrer** → Rentré
- **Tomber** → Tombé
- **Retourner** → Retourné
- **Arriver** → Arrivé
- **Mourir** → Mort
- **Partir** → Parti

## Common Mistake I Make
- ❌ *Je suis mangé une pomme* (Wrong!)
- ✅ *J’ai mangé une pomme* (Correct - Manger takes Avoir)
- ✅ *Je suis allé au marché* (Correct - Aller takes Être)`,
    createdAt: '2026-08-30T10:15:00Z',
    updatedAt: '2026-09-02T11:30:00Z',
    tags: ['Grammar', 'Passé Composé', 'Avoir vs Être', 'A2'],
  },
  {
    id: 'note-de-1',
    languageCode: 'de',
    title: '🥨 German Noun Genders: Der, Die, Das Shortcuts',
    category: 'GRAMMAR',
    content: `# German Gender Rules & Endings

German has three grammatical genders: Masculine (**der**), Feminine (**die**), Neuter (**das**).

## Helpful Ending Rules
- Words ending in **-ung**, **-heit**, **-keit**, **-schaft** are ALWAYS **die** (Feminine)
  - *die Hoffnung* (hope), *die Freiheit* (freedom)
- Words ending in **-chen**, **-lein** are ALWAYS **das** (Neuter)
  - *das Mädchen* (girl), *das Brötchen* (bread roll)
- Words ending in **-or**, **-ismus**, **-ling** are ALWAYS **der** (Masculine)
  - *der Motor*, *der Schmetterling* (butterfly)`,
    createdAt: '2026-09-02T09:00:00Z',
    updatedAt: '2026-09-02T09:00:00Z',
    tags: ['Grammar', 'Articles', 'Der Die Das', 'A1'],
  },
];
