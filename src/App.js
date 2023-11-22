import React, { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [countdown, setCountdown] = useState(25 * 60);
  const [sessionTime, setSessionTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);

   const handleStart = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsSession(true);
    setCountdown(sessionTime * 60);
  };

  useEffect(() => {
    let timerId;
    if (isRunning && countdown > 0) {
      timerId = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (isRunning && countdown === 0) {
      setIsSession(!isSession);
      setCountdown(isSession ? breakTime * 60 : sessionTime * 60 * 60);
    } else if (!isRunning) {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [isRunning, countdown, isSession, sessionTime, breakTime]);

  useEffect(() => {
    if (!isRunning && isSession) {
      setCountdown(sessionTime * 60);
    }
  }, [sessionTime, isRunning, isSession]);

  const Countdown =()=>{
    let minutes = Math.floor(countdown / 60);
    let seconds = countdown % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return `${minutes}:${seconds}`;
  }
  const handleIncreaseSession = () => {
    setSessionTime(sessionTime + 1);
  };

  const handleDecreaseSession = () => {
    if (sessionTime > 0) {
      setSessionTime(sessionTime - 1);
    }
  };

  const handleIncreaseBreak = () => {
    setBreakTime(breakTime + 1);
  };

  const handleDecreaseBreak = () => {
    if (breakTime > 0) {
      setBreakTime(breakTime - 1);
    }
  };

  return (
    <div className="main">
      <div className="container">
        <div className="main-2">
          <div className="countdown">{Countdown()}</div>
          <div className="cont-st">
            <h1>{isSession ? "Session Time" : "Break Time"}</h1>
          </div>
          <div className="cont">
            <div className="main-3">
              <h4>Session Time</h4>
              <button
                onClick={handleIncreaseSession}
                disabled={isRunning}
                className="btn-1"
              >
                +
              </button>
              <span className="spn">{sessionTime}</span>
              <button
                onClick={handleDecreaseSession}
                disabled={isRunning}
                className="btn-1"
              >
                -
              </button>
            </div>
            <div className="main-4">
              <h4>Break Time</h4>
              <button
                onClick={handleIncreaseBreak}
                disabled={isRunning}
                className="btn-1"
              >
                +
              </button>
              <span className="spn">{breakTime}</span>
              <button
                onClick={handleDecreaseBreak}
                disabled={isRunning}
                className="btn-1"
              >
                -
              </button>
            </div>
          </div>
          <div className="main-5">
            <button onClick={handleStart} className="btn-3">
              Start
            </button>
            <button onClick={handleReset} className="btn-3">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
