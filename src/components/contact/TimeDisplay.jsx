import { useState, useEffect } from 'react';

export function TimeDisplay() {
  const [time, setTime] = useState('--:--:--');

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', {
        hour12: true,
        timeZone: 'Europe/London',
      }));
    }

    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {time}
    </>
  );
}