import React, { useState } from "react";
import "./timer.css";
import BreakLength from "../BreakLength/breaklength";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { MdAutorenew } from "react-icons/md";

const Timer = () => {
  const [displayTime, setDisplayTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [sessionTime, setsessionTime] = useState(25 * 60);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [breakAudio, setBreakAudio] = useState(new Audio("./break.mp3"));

  const playBreakSound = () => {
    breakAudio.currentTime = 0;
    breakAudio.play();
  };

  const formatTime = (time) => {
    let minute = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (minute < 10 ? "0" + minute : minute) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };
  const changeTime = (amount, type) => {
    if (type === "break") {
      if (breakTime <= 60 && amount < 0) {
        return;
      }
      setBreakTime((prev) => prev + amount);
    } else {
      if (sessionTime <= 60 && amount < 0) {
        return;
      }
      setsessionTime((prev) => prev + amount);
      if (!timerOn) {
        setDisplayTime(sessionTime + amount);
      }
    }
  };

  const controlTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVariable = onBreak;
    if (!timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          setDisplayTime((prev) => {
            if (prev <= 0 && !onBreakVariable) {
              playBreakSound();
              onBreakVariable = true;
              setOnBreak(true);
              return breakTime;
            } else if (prev <= 0 && onBreakVariable) {
              playBreakSound();
              onBreakVariable = false;
              setOnBreak(false);
              return sessionTime;
            }
            return prev - 1;
          });
          nextDate += second;
        }
      }, 30);
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }
    if (timerOn) {
      clearInterval(localStorage.getItem("interval-id"));
    }
    setTimerOn(!timerOn);
  };
  const resetTime = () => {
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setsessionTime(25 * 60);
  };

  return (
    <>
      <div className="timer-container">
        <h1>Pomodoro Clock</h1>
        <div className="double-container">
          <BreakLength
            title={"Break length"}
            changeTime={changeTime}
            type={"break"}
            time={breakTime}
            formatTime={formatTime}
          />
          <BreakLength
            title={"session length"}
            changeTime={changeTime}
            type={"session"}
            time={sessionTime}
            formatTime={formatTime}
          />
        </div>
        <h2>{onBreak ? "Break" : "Session"}</h2>
        <div>
          <h1>{formatTime(displayTime)}</h1>
        </div>
        <button onClick={controlTime}>
          {timerOn ? (
            <AiFillPauseCircle size={30} />
          ) : (
            <AiFillPlayCircle size={30} />
          )}
        </button>
        &emsp;
        <button onClick={resetTime}>
          <MdAutorenew size={30} />
        </button>
      </div>
    </>
  );
};

export default Timer;
