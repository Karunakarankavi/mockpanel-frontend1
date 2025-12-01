import React from 'react';
import '../styles/PageLayout.css';

export function AnalysisPage() {
  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-card">
          <h2>Analysis</h2>
          <p>Analyze your interview performance and get detailed insights into your strengths and areas for improvement.</p>
          
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <div>
                <h3>Performance Metrics</h3>
                <p>Track your progress across multiple interviews</p>
              </div>
            </div>
            
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <div>
                <h3>Feedback Analysis</h3>
                <p>Detailed feedback on communication and technical skills</p>
              </div>
            </div>
            
            <div className="feature-item">
              <span className="feature-icon">📈</span>
              <div>
                <h3>Improvement Trends</h3>
                <p>See how you're improving over time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
