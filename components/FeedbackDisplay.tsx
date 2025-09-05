
import React from 'react';
import type { ParsedFeedback } from '../types';

interface FeedbackDisplayProps {
  feedback: ParsedFeedback | null;
  isLoading: boolean;
}

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
  <div className={`bg-cocoa-med p-4 rounded-lg border border-cocoa-light shadow-md ${className}`}>
    <h3 className="text-xl font-bold text-caramel mb-3">{title}</h3>
    <div className="prose prose-invert max-w-none text-cream/90 space-y-2">{children}</div>
  </div>
);

const SimpleMarkdown: React.FC<{ text: string }> = ({ text }) => {
  return (
    <>
      {text.split('\n').map((line, i) => {
        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
          return <p key={i} className="pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-caramel">{line.substring(2)}</p>;
        }
        if (/^\d\./.test(line.trim())) {
            return <p key={i} className="pl-4">{line}</p>;
        }
        return <p key={i}>{line}</p>;
      })}
    </>
  );
};

const SkeletonLoader: React.FC = () => (
    <div className="space-y-6 animate-pulse">
        <div className="h-16 bg-cocoa-light rounded-lg"></div>
        <div className="h-32 bg-cocoa-light rounded-lg"></div>
        <div className="h-48 bg-cocoa-light rounded-lg"></div>
        <div className="h-24 bg-cocoa-light rounded-lg"></div>
    </div>
);


const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedback, isLoading }) => {
  if (isLoading) {
    return <div className="mt-6"><SkeletonLoader /></div>;
  }

  if (!feedback) {
    return null;
  }

  return (
    <div className="mt-6 space-y-6">
      {feedback.verdict && (
        <Section title="Verdetto del Purrfessor" className="bg-gradient-to-r from-cocoa-med to-cocoa-light">
          <p className="text-2xl font-bold">{feedback.verdict}</p>
        </Section>
      )}

      {feedback.lineByLine && (
        <Section title="Feedback Riga per Riga 🐾">
          <SimpleMarkdown text={feedback.lineByLine} />
        </Section>
      )}
      
      {feedback.improvedCode && (
        <Section title="Versione Migliorata 🍫">
          <pre className="bg-cocoa-dark p-4 rounded-md font-mono text-amber whitespace-pre-wrap">
            <code>{feedback.improvedCode}</code>
          </pre>
        </Section>
      )}

      {feedback.explanation && (
        <Section title="Perché Funziona">
          <SimpleMarkdown text={feedback.explanation} />
        </Section>
      )}

      {feedback.glossary && (
        <Section title="Mini Glossario">
          <SimpleMarkdown text={feedback.glossary} />
        </Section>
      )}

      {feedback.task && (
        <Section title="Compito Pratico">
          <p className="italic">{feedback.task}</p>
        </Section>
      )}

      {feedback.quiz && (
        <Section title="Quiz!">
          <SimpleMarkdown text={feedback.quiz} />
        </Section>
      )}

      {feedback.reward && (
        <Section title="Ricompensa!" className="text-center bg-caramel text-cocoa-dark">
          <p className="font-bold text-lg">{feedback.reward}</p>
        </Section>
      )}

      {feedback.nextStep && (
        <Section title="Prossimo Passo">
          <p className="font-semibold">{feedback.nextStep}</p>
        </Section>
      )}
    </div>
  );
};

export default FeedbackDisplay;
