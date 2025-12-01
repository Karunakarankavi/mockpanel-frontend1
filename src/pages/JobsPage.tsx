import React from 'react';
import '../styles/PageLayout.css';

export function JobsPage() {
  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-card">
          <h2>Jobs</h2>
          <p>Browse and apply for job opportunities that match your profile.</p>
          
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">💼</span>
              <div>
                <h3>Job Listings</h3>
                <p>Access thousands of job listings across industries</p>
              </div>
            </div>
            
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <div>
                <h3>Matched Jobs</h3>
                <p>Get personalized job recommendations based on your profile</p>
              </div>
            </div>
            
            <div className="feature-item">
              <span className="feature-icon">📬</span>
              <div>
                <h3>Application Tracking</h3>
                <p>Track all your job applications in one place</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
