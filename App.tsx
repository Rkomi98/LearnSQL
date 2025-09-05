
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SqlInput from './components/SqlInput';
import FeedbackDisplay from './components/FeedbackDisplay';
import UserProfile from './components/UserProfile';
import { getSQLReview } from './services/geminiService';
import { parseFeedback, extractCacaoBeans, extractBadge } from './utils/parser';
import type { ParsedFeedback, UserProfileData } from './types';

const initialChallenge = {
  theory: "Benvenuto/a nel mio studio! Sono il Purrfessor Cocoa. 🐾 Iniziamo il nostro viaggio nel mondo di SQL con le basi: `SELECT` e `FROM`. Pensa a `SELECT` come a dire al tuo gattino quali croccantini specifici vuoi che ti porti (le colonne di dati). `FROM` gli dice da quale ciotola prenderli (la tabella). Insieme, dicono al database esattamente quali informazioni stai cercando. Semplice, no? 🍫",
  task: "La tua prima missione, se decidi di accettarla, è di chiedere al database tutti gli URL delle pagine che abbiamo. La tabella si chiama `pages` e contiene una colonna chiamata `url`. Scrivi la query qui sotto!"
};

const App: React.FC = () => {
  const [sqlQuery, setSqlQuery] = useState<string>('');
  const [feedback, setFeedback] = useState<ParsedFeedback | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileData>({
    cacaoBeans: 0,
    badges: [],
  });

  const handleSubmit = useCallback(async () => {
    if (!sqlQuery.trim()) {
      setError("Miao! Non puoi lasciare la lavagna vuota. Scrivi una query!");
      return;
    }
    setIsLoading(true);
    setError(null);
    setFeedback(null);

    try {
      const responseText = await getSQLReview(sqlQuery);
      const parsed = parseFeedback(responseText);
      setFeedback(parsed);

      const newBeans = extractCacaoBeans(parsed.reward);
      const newBadge = extractBadge(parsed.reward);

      setUserProfile(prev => {
          const updatedBadges = newBadge && !prev.badges.includes(newBadge) 
              ? [...prev.badges, newBadge] 
              : prev.badges;
          
          return {
              cacaoBeans: prev.cacaoBeans + newBeans,
              badges: updatedBadges,
          };
      });

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [sqlQuery]);

  return (
    <div className="min-h-screen bg-cocoa-dark text-cream p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Header />
        <UserProfile profile={userProfile} />
        <main>
          <div className="bg-cocoa-med p-4 sm:p-6 rounded-lg shadow-lg border border-cocoa-light space-y-4 mb-8">
            <div>
              <h2 className="text-xl font-bold text-caramel mb-2">Lezione del Giorno 📚</h2>
              <p className="text-cream/90 leading-relaxed">
                {initialChallenge.theory.split('`').map((part, i) =>
                  i % 2 === 1 ? (
                    <code key={i} className="bg-cocoa-dark text-amber px-1.5 py-1 rounded-md font-mono text-sm">
                      {part}
                    </code>
                  ) : (
                    <React.Fragment key={i}>{part}</React.Fragment>
                  )
                )}
              </p>
            </div>
            <hr className="border-cocoa-light/50" />
            <div>
              <h2 className="text-xl font-bold text-caramel mb-2">Il tuo Compito Pratico 🧑‍💻</h2>
              <p className="italic text-cream/90">{initialChallenge.task}</p>
            </div>
          </div>
          <SqlInput
            value={sqlQuery}
            onChange={setSqlQuery}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          {error && (
            <div className="mt-6 p-4 bg-red-900/50 border border-red-500 text-red-200 rounded-lg text-center">
              <p className="font-bold">Oh no, un groviglio!</p>
              <p>{error}</p>
            </div>
          )}
          <FeedbackDisplay feedback={feedback} isLoading={isLoading} />
        </main>
      </div>
    </div>
  );
};

export default App;
