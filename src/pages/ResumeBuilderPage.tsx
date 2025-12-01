import React from 'react';
import '../styles/PageLayout.css';

export function ResumeBuilderPage() {
  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-card">
          <h2>Resume Builder</h2>
          <p>Create a professional resume with our easy-to-use resume builder.</p>
          
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">📝</span>
              <div>
                <h3>Professional Templates</h3>
                <p>Choose from professionally designed resume templates</p>
              </div>
            </div>
            
            <div className="feature-item">
              <span className="feature-icon">🎨</span>
              <div>
                <h3>Customization</h3>
                <p>Customize colors, fonts, and layouts to match your style</p>
              </div>
            </div>
            
            <div className="feature-item">
              <span className="feature-icon">📥</span>
              <div>
                <h3>Export Options</h3>
                <p>Download your resume in PDF or Word format</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
