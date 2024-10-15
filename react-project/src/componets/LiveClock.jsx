import React, { useState, useEffect } from 'react';

const LiveClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update the time every second

    // Cleanup the interval on component unmount
    return () => clearInterval(timerId);
  }, []);

  // Format the time as HH:mm:ss
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Change to true if you want 12-hour format
    });
  };

  return (
    <div>
      <h2>{formatTime(currentTime)}</h2>
    </div>
  );
};

export default LiveClock;
