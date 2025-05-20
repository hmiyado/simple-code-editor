import { useEffect, useRef, useState } from "react";

export default function Timer() {
  const [totalSeconds, setTotalSeconds] = useState(300); // Default to 5 minutes
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Calculate minutes and seconds from totalSeconds
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Format time as mm:ss
  const formatTime = (totalSecs: number): string => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Start or pause the timer
  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  // Increment/decrement minutes
  const incrementMinutes = () => {
    if (minutes < 99) {
      setTotalSeconds(totalSeconds + 60);
    }
  };

  const decrementMinutes = () => {
    if (minutes > 0) {
      setTotalSeconds(totalSeconds - 60);
    }
  };

  // Increment/decrement seconds
  const incrementSeconds = () => {
    if (seconds < 59) {
      setTotalSeconds(totalSeconds + 1);
    } else if (minutes < 99) {
      // If seconds would roll over to 00, increment minutes instead
      setTotalSeconds(totalSeconds + 1);
    }
  };

  const decrementSeconds = () => {
    if (seconds > 0) {
      setTotalSeconds(totalSeconds - 1);
    } else if (minutes > 0) {
      // If seconds would roll under 0, decrement from minutes instead
      setTotalSeconds(totalSeconds - 1);
    }
  };

  // Timer countdown logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTotalSeconds((prev) => {
          if (prev <= 0) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  return (
    <div className="is-flex" style={{ alignItems: "center" }}>
      <div className="mr-2">
        <span
          className="has-text-weight-bold"
          style={{
            fontFamily: "monospace",
            fontSize: "1rem",
            display: "inline-block",
            width: "5ch",
            textAlign: "center",
          }}
        >
          {formatTime(totalSeconds)}
        </span>
      </div>
      <div className="is-flex mr-2">
        <button
          className="button is-small mr-1"
          onClick={decrementMinutes}
          disabled={isRunning}
        >
          -
        </button>
        <button
          className="button is-small"
          onClick={incrementMinutes}
          disabled={isRunning}
        >
          +
        </button>
      </div>
      <div className="is-flex mr-2">
        <button
          className="button is-small mr-1"
          onClick={decrementSeconds}
          disabled={isRunning}
        >
          -
        </button>
        <button
          className="button is-small"
          onClick={incrementSeconds}
          disabled={isRunning}
        >
          +
        </button>
      </div>
      <button
        className={`button is-small ${isRunning ? "is-danger" : "is-success"}`}
        onClick={toggleTimer}
      >
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  );
}
