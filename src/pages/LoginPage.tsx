import React from 'react';
import '../styles/PageLayout.css';
import './LoginPage.css';

type LoginPageProps = {
  onLogin?: () => void;
};

export function LoginPage({ onLogin }: LoginPageProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder: actual auth handled elsewhere
    if (onLogin) onLogin();
  };

  return (
    <div className="page-container login-page">
      <div className="page-content">
        <div className="login-card">
          <h2 className="login-title">Login as</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="field-label">User</label>
            <input className="field-input" type="text" name="username" placeholder="Enter username" required />

            <label className="field-label">Password</label>
            <input className="field-input" type="password" name="password" placeholder="Enter password" required />

            <div className="login-actions">
              <button type="submit" className="primary-btn">Sign In</button>
              <button type="button" className="secondary-btn">Sign Up</button>
            </div>

            <div className="divider">or continue with</div>

            <div className="social-row">
              <button type="button" className="social-btn google" onClick={() => onLogin && onLogin()}>🔴 Google</button>
              <button type="button" className="social-btn naukri" onClick={() => onLogin && onLogin()}>🔵 Naukri</button>
              <button type="button" className="social-btn linkedin" onClick={() => onLogin && onLogin()}>🔗 LinkedIn</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
