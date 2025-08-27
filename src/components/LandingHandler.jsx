import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function LandingScreen({ children }) {
  const [showLanding, setShowLanding] = useState(false);
  const [landingLoading, setLandingLoading] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisitedSite');
    if (!hasVisited) {
      setShowLanding(true);
      sessionStorage.setItem('showingLanding', 'true');
    }
    setLandingLoading(false);
  }, []);

  const handleEnter = () => {    
    sessionStorage.setItem('hasVisitedSite', 'true');
    sessionStorage.removeItem('showingLanding');
    
    setTimeout(() => {
      window.dispatchEvent(new Event('landingDismissed'));
    }, 50);
    
    setShowLanding(false);
  };

  if (!showLanding && !landingLoading) {
    return children;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="flex flex-col justify-center items-center text-center gap-4">
        <div className="drop-shadow-md drop-shadow-blue-100/50">
          <img
            src="/mooney-w.svg"
            className="h-24"
            alt="Zak Mooney Logo"
          />
        </div>
        <h1 className="text-3xl font-heading font-bold drop-shadow-md drop-shadow-blue-100/50">
          Zak Mooney
        </h1>
        <h3 className="text-xl font-heading drop-shadow-md drop-shadow-blue-100/50">
          Frontend Developer
        </h3>
        <Button
          onClick={handleEnter}
          className="transition-all duration-200 hover:scale-105"
        >
          ENTER
        </Button>
      </div>
    </div>
  );
}