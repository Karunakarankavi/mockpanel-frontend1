import React from 'react';
import '../styles/PageLayout.css';
import './LoginPage.css';
import * as CryptoJS from 'crypto-js';
import {signupUser, signInUser} from '../api/api';
import {confirmSignup} from '../api/api';


type LoginPageProps = {
  onLogin?: () => void;
};

export function LoginPage({ onLogin }: LoginPageProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = String(formData.get('username') || '').trim();
    const password = String(formData.get('password') || '');
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }
    try {
      const result = await signInUser(email, password);
      console.log('Sign in success', result);
      if (onLogin) onLogin();
    } catch (err: any) {
      console.error('Sign in failed', err);
      alert('Sign in failed: ' + (err?.message || String(err)));
    }
  };

  const [showSignup, setShowSignup] = React.useState(false);
  const [showOtpConfirm, setShowOtpConfirm] = React.useState(false);
  const [signupEmail, setSignupEmail] = React.useState('');

  const openSignup = () => setShowSignup(true);
  const closeSignup = () => setShowSignup(false);
  const openOtpConfirm = (email: string) => {
    setSignupEmail(email);
    setShowOtpConfirm(true);
    setShowSignup(false);
  };
  const closeOtpConfirm = () => setShowOtpConfirm(false);


  

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = String(formData.get('email') || '').trim();
    const password = String(formData.get('password') || '');
    const confirm = String(formData.get('confirm') || '');
    if (!email || !password) {
      alert('Please fill all fields');
      return;
    }
    if (password !== confirm) {
      alert('Passwords do not match');
      return;
    }
   try {
      const result = await signupUser({ email, password,  });
      console.log('Signup successful:', result);
      openOtpConfirm(email);
    } catch (error: any) {
      console.error('Signup error:', error);
      alert('Signup failed: ' + JSON.stringify(error));
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const otp = String(formData.get('otp') || '').trim();
    if (!otp) {
      alert('Please enter OTP');
      return;
    }
    let email = signupEmail;
    console.log('OTP verified:', otp);
    try {
      const result = await confirmSignup(email, otp);
      console.log('OTP confirmation successful:', result);
      alert('Sign up successful! Please log in with your credentials.');
      closeOtpConfirm();
    } catch (error: any) {
      console.error('OTP verification error:', error);
      alert('OTP verification failed: ' + JSON.stringify(error));
    }
  };

  return (
    <div className="page-container login-page">
      <div className="page-content">
        <div className="login-card">
          <h2 className="login-title">Login as</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="field-label">Email</label>
            <input className="field-input" type="text" name="username" placeholder="Enter email" required />

            <label className="field-label">Password</label>
            <input className="field-input" type="password" name="password" placeholder="Enter password" required />

            <div className="login-actions">
              <button type="submit" className="primary-btn">Sign In</button>
              <button type="button" className="secondary-btn" onClick={openSignup}>Sign Up</button>
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

      {showSignup && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <h3 className="modal-title">Sign Up</h3>
            <form className="modal-form" onSubmit={handleSignupSubmit}>
              <label className="field-label">Email</label>
              <input className="modal-input" name="email" type="email" required />

              <label className="field-label">Password</label>
              <input className="modal-input" name="password" type="password" required />

              <label className="field-label">Confirm Password</label>
              <input className="modal-input" name="confirm" type="password" required />

              <div className="modal-actions">
                <button type="button" className="secondary-btn" onClick={closeSignup}>Cancel</button>
                <button type="submit" className="primary-btn">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showOtpConfirm && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <h3 className="modal-title">Confirm Sign Up</h3>
            <p className="otp-message">Enter the OTP sent to <strong>{signupEmail}</strong></p>
            <form className="modal-form" onSubmit={handleOtpSubmit}>
              <label className="field-label">OTP</label>
              <input className="modal-input" name="otp" type="text" placeholder="Enter 6-digit OTP" maxLength={6} required />

              <div className="modal-actions">
                <button type="button" className="secondary-btn" onClick={closeOtpConfirm}>Cancel</button>
                <button type="submit" className="primary-btn">Verify</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
