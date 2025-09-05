
import React from 'react';

const BadgeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2L4 5v6.09c0 4.94 3.37 9.4 8 10.91 4.63-1.51 8-5.97 8-10.91V5l-8-3zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.92V13H5V6.3l7-3.11v9.8z" />
    </svg>
);

export default BadgeIcon;
