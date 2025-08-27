import { useState, useEffect } from 'react';

export function TimezoneDisplay() {
  const [timezone, setTimezone] = useState('--- (---)');

  useEffect(() => {
    function updateTimezone() {
      const now = new Date();
      
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZoneName: 'short'
      });
      
      const parts = formatter.formatToParts(now);
      const tzAbbr = parts.find(part => part.type === 'timeZoneName')?.value || 'GMT';
      
      const offset = -now.getTimezoneOffset() / 60;
      const offsetString = `UTC${offset >= 0 ? '+' : ''}${offset}`;
      
      setTimezone(`${tzAbbr} (${offsetString})`);
    }
    updateTimezone();
  }, []);

  return (
    <>
      {timezone}
    </>
  );
}