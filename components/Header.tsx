
import React from 'react';
import CatIcon from './icons/CatIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center p-4 rounded-lg bg-cocoa-med shadow-lg border-t-2 border-caramel">
      <div className="flex items-center justify-center gap-4">
        <CatIcon className="w-12 h-12 text-amber" />
        <div>
            <h1 className="text-4xl font-bold text-amber tracking-wider">Purrfessor Cocoa</h1>
            <p className="text-cream/80 mt-1">Il tuo mentore SQL, con un debole per il cioccolato 🐾🍫</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
