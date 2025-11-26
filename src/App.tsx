import React, { useEffect } from 'react';
import { Interviewer } from './Interviewer';
import './App.css';
import { ResumeMatchPage } from './ResumeMatchPage';


function App() {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [started, setStarted] = React.useState(false);
  const [canAnimate, setCanAnimate] = React.useState(false);
  const [audioDuration, setAudioDuration] = React.useState(3.0); // Default duration

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

  


  return (
    <div
      className="App"
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        backgroundImage: 'url(/bg4.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      
      
      {canAnimate ? (
        <Interviewer canAnimate={canAnimate} animationDuration={audioDuration} />
      ) : (
        <ResumeMatchPage onSuccess={() => setCanAnimate(true)} />
      )}
    </div>
  );
}

export default App;




