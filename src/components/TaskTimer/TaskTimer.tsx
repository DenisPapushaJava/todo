import React, { useState, useEffect } from 'react';
import './TaskTimer.css';

interface TaskTimerProps {
  onStart: () => void;
  onPause: () => void;
  timesSecond: number;
}

export default function TaskTimer(props: TaskTimerProps) {
  const { onStart, onPause, timesSecond } = props;

  const convertTime = (times: number): string => {
    const padTime = (time: number): string => time.toString().padStart(2, '0');
    const minutes = padTime(Math.floor(times / 60));
    // @ts-ignore
    const seconds = padTime(times - minutes * 60);
    return `${minutes}:${seconds}`;
  };

  const [formattedTime, setFormattedTime] = useState<string>(convertTime(timesSecond));

  useEffect(() => {
    setFormattedTime(convertTime(timesSecond));
  }, [timesSecond]);

  return (
    <>
      <button type="button" className="icon icon-play" aria-label="Play" onClick={onStart} />
      <button type="button" className="icon icon-pause" aria-label="Pause" onClick={onPause} />
      <div className="time" aria-label="time">
        {formattedTime}
      </div>
    </>
  );
}
