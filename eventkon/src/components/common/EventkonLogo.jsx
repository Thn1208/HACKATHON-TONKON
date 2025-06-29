import React from 'react';
import { Link } from 'react-router-dom';

const EventkonLogo = ({ className = "h-8 w-auto" }) => {
  return (
    <Link to="/" className="flex items-center group">
      <img 
        src="/src/assets/logo.png" 
        alt="EventKON Logo" 
        className={`${className} transition-transform duration-200 group-hover:scale-105`}
      />
    </Link>
  );
};

export default EventkonLogo;