import React from 'react';
import '../styles/PageLayout.css';

export function StudyMaterialPage() {
  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-card">
          <h2>Study Material</h2>
          <p>Access comprehensive study materials to prepare for your mock interviews.</p>
          
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">📚</span>
              <div>
                <h3>Interview Guides</h3>
                <p>Step-by-step guides for different types of interviews</p>
              </div>
            </div>
            
            <div className="feature-item">
              <span className="feature-icon">💡</span>
              <div>
                <h3>Tips & Tricks</h3>
                <p>Expert tips to ace your interviews</p>
              </div>
            </div>
            
            <div className="feature-item">
              <span className="feature-icon">📝</span>
              <div>
                <h3>Sample Questions</h3>
                <p>Practice with commonly asked interview questions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
