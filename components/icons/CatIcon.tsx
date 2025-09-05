
import React from 'react';

const CatIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2a10 10 0 0 0-8 4.2c-.5 1-2 5.5 1 9.8 2.8 4 8 3 8 3s5.2 1 8-3c3-4.3 1.5-8.8 1-9.8A10 10 0 0 0 12 2z" />
    <path d="M4.5 11.5c.5.5 1.5 1 2.5 1" />
    <path d="M17 12.5c1 0 2-.5 2.5-1" />
    <path d="M12 16c-2 0-3 1-3 1" />
    <path d="M15 17s-1-1-3-1" />
    <path d="M9 8V7" />
    <path d="M15 8V7" />
  </svg>
);

export default CatIcon;
