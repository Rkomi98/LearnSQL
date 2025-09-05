
import type { ParsedFeedback } from '../types';

function extractSection(text: string, startMarker: string, endMarker?: string): string {
    const startRegex = new RegExp(`\\*\\*${startMarker}\\*\\*:?`, 'i');
    const match = text.match(startRegex);

    if (!match || typeof match.index === 'undefined') {
        return '';
    }
    
    const startIndex = match.index + match[0].length;
    let endIndex;

    if (endMarker) {
        const endRegex = new RegExp(`\\*\\*${endMarker}\\*\\*:?`, 'i');
        const endMatch = text.substring(startIndex).match(endRegex);
        if (endMatch && typeof endMatch.index !== 'undefined') {
            endIndex = startIndex + endMatch.index;
        }
    }
    
    return text.substring(startIndex, endIndex).trim();
}


export function parseFeedback(text: string): ParsedFeedback {
    return {
        verdict: extractSection(text, 'Verdetto', 'Feedback riga-per-riga'),
        lineByLine: extractSection(text, 'Feedback riga-per-riga', 'Versione migliorata'),
        improvedCode: extractSection(text, 'Versione migliorata', 'Perché funziona').replace(/```sql|```/g, '').trim(),
        explanation: extractSection(text, 'Perché funziona', 'Glossario mini'),
        glossary: extractSection(text, 'Glossario mini', 'Compito pratico'),
        task: extractSection(text, 'Compito pratico', 'Quiz 1 domanda \\(MCQ\\)'),
        quiz: extractSection(text, 'Quiz 1 domanda \\(MCQ\\)', 'Ricompensa'),
        reward: extractSection(text, 'Ricompensa', 'Prossimo passo'),
        nextStep: extractSection(text, 'Prossimo passo'),
    };
}

export function extractCacaoBeans(rewardText: string): number {
    const match = rewardText.match(/\+(\d+)\s+Cacao\s+Beans/i);
    return match ? parseInt(match[1], 10) : 0;
}

export function extractBadge(rewardText: string): string | null {
    const match = rewardText.match(/badge\s+\*([^*]+)\*/i);
    return match ? match[1] : null;
}
