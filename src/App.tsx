import React, { useEffect } from 'react';
import { Interviewer } from './Interviewer';
import { Header, Footer } from './HeaderFooter';
import { Sidebar } from './Sidebar';
import { AnalysisPage } from './pages/AnalysisPage';
import { StudyMaterialPage } from './pages/StudyMaterialPage';
import { ATSPage } from './pages/ATSPage';
import { ResumeBuilderPage } from './pages/ResumeBuilderPage';
import { JobsPage } from './pages/JobsPage';
import { LoginPage } from './pages/LoginPage';
import './App.css';
import { ResumeMatchPage } from './ResumeMatchPage';


function App() {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [started, setStarted] = React.useState(false);
  const [canAnimate, setCanAnimate] = React.useState(false);
  const [audioDuration, setAudioDuration] = React.useState(3.0); // Default duration
  const [currentPage, setCurrentPage] = React.useState<string>('login');
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  // Get audio duration when loaded
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleLoadedMetadata = () => {
      setAudioDuration(audio.duration);
    };
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const handleSidebarClick = (pageId: string) => {
    setCurrentPage(pageId);
    // Reset animation state when switching pages
    if (pageId !== 'mockinterview') {
      setCanAnimate(false);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('mockinterview');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'mockinterview':
        return canAnimate ? (
          <Interviewer canAnimate={canAnimate} animationDuration={audioDuration} />
        ) : (
          <ResumeMatchPage onSuccess={() => setCanAnimate(true)} />
        );
      case 'analysis':
        return <AnalysisPage />;
      case 'studymaterial':
        return <StudyMaterialPage />;
      case 'ats':
        return <ATSPage />;
      case 'resumebuilder':
        return <ResumeBuilderPage />;
      case 'jobs':
        return <JobsPage />;
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      default:
        return <ResumeMatchPage onSuccess={() => setCanAnimate(true)} />;
    }
  };

  


  return (
    <div
      className="App"
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: 'url(/bg4.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Header />
      
      <div className="app-layout">
        {isAuthenticated && (
          <Sidebar onItemClick={handleSidebarClick} activeItem={currentPage} />
        )}

        <main className="app-main">
          {(!isAuthenticated && currentPage !== 'login') ? (
            <LoginPage onLogin={handleLogin} />
          ) : (
            renderContent()
          )}
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;




