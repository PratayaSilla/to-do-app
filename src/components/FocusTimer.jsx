import { useState, useEffect } from 'react';

function FocusTimer() {
  const [seconds, setSeconds] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    let interval = null;
    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const formatTime = () => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleStartPause = () => setIsRunning(!isRunning);

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(1500);
  };

  const handleSetTime = () => {
    const mins = parseInt(editValue);
    if (!isNaN(mins) && mins > 0) {
      setSeconds(mins * 60);
    }
    setIsEditing(false);
    setEditValue('');
    setIsRunning(false);
  };

  return (
    <div className="focus-timer">
      <h3 className="section-title">🎯 Focus Timer</h3>

      {isEditing ? (
        <div className="edit-mode">
          <input
            type="number"
            placeholder="Enter minutes"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="edit-input"
          />
          <button onClick={handleSetTime} className="edit-button">Set</button>
        </div>
      ) : (
        <div>
          <div className="timer-display">{formatTime()}</div>
          <button onClick={() => setIsEditing(true)} className="edit-button">Set custom timer</button>
        </div>
      )}

      <div className="timer-buttons">
        <button onClick={handleStartPause}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default FocusTimer;
