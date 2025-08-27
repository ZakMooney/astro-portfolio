import { useEffect, useState, useRef } from 'react';

export const useInitialAnimation = (key = 'default') => {
  const animationDecided = useRef(false);
  const animationValue = useRef(false);
  
  if (!animationDecided.current && typeof window !== 'undefined') {
    const storageKey = `skip-animation-${key}`;
    const skipAnimation = sessionStorage.getItem(storageKey);
    const hasVisitedSite = sessionStorage.getItem('hasVisitedSite');
    
    if (!hasVisitedSite) {
      animationValue.current = false;
    } else if (skipAnimation !== 'true') {
      animationValue.current = true;
      // set flag immediately
      sessionStorage.setItem(storageKey, 'true');
    } else {
      animationValue.current = false;
    }
    
    animationDecided.current = true;
  }
  
  useEffect(() => {
    const storageKey = `skip-animation-${key}`;
    
    // clear flag on page unload
    const handleUnload = () => {
      sessionStorage.removeItem(storageKey);
    };
    
    window.addEventListener('beforeunload', handleUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [key]);
  
  return animationValue.current;
};