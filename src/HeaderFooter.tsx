import React from 'react';
import './HeaderFooter.css';

export function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo-section">
            <span className="logo-text">MockPanel</span>
          </div>
        </div>
        <div className="header-right">
          <div className="icons-section">
            <button className="icon-button" title="Notifications">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                <path d="M10 5v5l4.25 2.52" />
              </svg>
            </button>
            <button className="icon-button" title="Profile">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 10c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2 0-6 1-6 3v2h12v-2c0-2-4-3-6-3z" />
              </svg>
            </button>
            <button className="icon-button logout-btn" title="Logout">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13 6l4 4m0 0l-4 4m4-4H7m6-6v2c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-content">
          <p>&copy; 2025 MockPanel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
