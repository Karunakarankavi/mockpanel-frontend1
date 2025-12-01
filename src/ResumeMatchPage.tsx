import React, { useState } from 'react';
import './ResumeMatchPage.css';

type ResumeMatchPageProps = {
  onSuccess?: () => void;
};

export function ResumeMatchPage({ onSuccess }: ResumeMatchPageProps) {
  const [formData, setFormData] = useState({
    resume: null as File | null,
    jobDescription: '',
    userId: '',
    jobRole: '',
    experience: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      resume: file
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.resume) {
      alert('Please upload a resume PDF');
      return;
    }

      sessionStorage.setItem("userid", formData.userId);


    const formDataToSend = new FormData();
    formDataToSend.append('resume', formData.resume);
    formDataToSend.append('jobDescription', formData.jobDescription);
    formDataToSend.append('userId', formData.userId);
    formDataToSend.append('role', formData.jobRole);
    formDataToSend.append('exp', formData.experience);

    console.log('Submitting form to http://localhost:8085/MpSetTopicsFromResume');
    console.log('Form data:', {
      resume: formData.resume.name,
      jobDescription: formData.jobDescription,
      userId: formData.userId,
      role: formData.jobRole,
      exp: formData.experience
    });

    fetch('http://localhost:8085/MpSetTopicsFromResume', {
      method: 'POST',
      body: formDataToSend,
      credentials: 'include'
    })
      .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        alert('Form submitted successfully!');
        // Notify parent that submission succeeded so app can route to Interviewer
        if (onSuccess) onSuccess();
      })
      .catch(error => {
        console.error('Full error:', error);
        console.error('Error message:', error.message);
        alert('Error submitting form: ' + error.message + '\n\nMake sure your backend server is running on http://localhost:6000');
      });
  };

  return (
    <div className="resume-match-page">
      {/* Main Body */}
      <main className="main-content">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="resume-form">
            <h2>Submit resume for MockInterview</h2>

            {/* User ID Field */}
            <div className="form-group">
              <label htmlFor="userId">User ID:</label>
              <input
                type="text"
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
                placeholder="Enter your user ID"
                required
              />
            </div>

            {/* Job Role Field */}
            <div className="form-group">
              <label htmlFor="jobRole">Job Role:</label>
              <input
                type="text"
                id="jobRole"
                name="jobRole"
                value={formData.jobRole}
                onChange={handleInputChange}
                placeholder="Enter job role (e.g., Software Engineer)"
                required
              />
            </div>

            {/* Experience Field */}
            <div className="form-group">
              <label htmlFor="experience">Experience (Years):</label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="Enter years of experience"
                min="0"
                required
              />
            </div>

            {/* Resume Field */}
            <div className="form-group">
              <label htmlFor="resume">Resume (PDF):</label>
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={handleFileChange}
                accept=".pdf"
                required
              />
              {formData.resume && (
                <p className="file-name">Selected: {formData.resume.name}</p>
              )}
            </div>

            {/* Job Description Field */}
            <div className="form-group">
              <label htmlFor="jobDescription">Job Description:</label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleInputChange}
                placeholder="Paste the job description here"
                rows={6}
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
