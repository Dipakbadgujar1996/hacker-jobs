import React from 'react';


function Navigation({ isDarkMode, toggleMode }) {
  return (
    <nav className={`navbar ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="nav-content">
        <h2>Hacker News App</h2>
        <button className="mode-toggle" onClick={toggleMode}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </nav>
  );
}

export default Navigation;