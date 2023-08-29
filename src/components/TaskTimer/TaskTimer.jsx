import React, { Component } from 'react';

import './TaskTimer.css';

export default class TaskTimer extends Component {
  convertTime = (times) => {
    const padTime = (time) => time.toString().padStart(2, '0');
    const minutes = padTime(Math.floor(times / 60));
    const seconds = padTime(times - minutes * 60);
    return `${minutes}:${seconds}`;
  };

  render() {
    const { onStart, onPause, timesSecond } = this.props;
    const formattedTime = this.convertTime(timesSecond);
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
}
