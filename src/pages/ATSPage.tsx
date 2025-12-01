import React from 'react';
import '../styles/PageLayout.css';

export function ATSPage() {
  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-card">
          <h2>ATS - Applicant Tracking System</h2>
          <p>Optimize your resume to pass through ATS screening and reach recruiters.</p>
          
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">⚙️</span>
              <div>
                <h3>ATS Compatibility Check</h3>
                <p>Verify if your resume passes ATS screening</p>
              </div>
            </div>
            
            <div className="feature-item">
              <span className="feature-icon">🔍</span>
              <div>
                <h3>Keyword Optimization</h3>
                <p>Discover keywords that ATS systems look for</p>
              </div>
            </div>
            
            <div className="feature-item">
              <span className="feature-icon">✅</span>
              <div>
                <h3>Format Suggestions</h3>
                <p>Format recommendations for better ATS readability</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
