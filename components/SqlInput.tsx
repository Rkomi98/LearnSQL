
import React from 'react';

interface SqlInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const SqlInput: React.FC<SqlInputProps> = ({ value, onChange, onSubmit, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      onSubmit();
    }
  };
    
  return (
    <div className="bg-cocoa-med p-4 sm:p-6 rounded-lg shadow-lg border border-cocoa-light">
      <label htmlFor="sql-input" className="block text-lg font-bold mb-2 text-caramel">
        Scrivi qui la tua query SQL:
      </label>
      <textarea
        id="sql-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full h-48 p-3 bg-cocoa-dark text-cream font-mono rounded-md border-2 border-cocoa-light focus:border-amber focus:ring-amber focus:outline-none transition-colors"
        placeholder="SELECT url FROM pages..."
        disabled={isLoading}
      />
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-cream/70">
          Premi <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Cmd/Ctrl</kbd> + <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Enter</kbd> per inviare.
        </p>
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full sm:w-auto px-8 py-3 bg-caramel text-cocoa-dark font-bold rounded-lg hover:bg-amber focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cocoa-med focus:ring-amber transition-all duration-200 ease-in-out transform hover:scale-105 disabled:bg-cocoa-light disabled:cursor-not-allowed disabled:scale-100"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analizzando...
            </div>
          ) : (
            'Chiedi al Purrfessor'
          )}
        </button>
      </div>
    </div>
  );
};

export default SqlInput;
