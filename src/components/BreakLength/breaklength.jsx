import React from "react";
import "./breaklength.css";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const BreakLength = ({ title, changeTime, type, time, formatTime }) => {
  return (
    <div>
      <h3>{title}</h3>
      <div className="lenght-container">
        <button onClick={() => changeTime(-60, type)}>
          <AiFillCaretDown size={20} />
        </button>
        <h2>{formatTime(time)}</h2>
        <button onClick={() => changeTime(60, type)}>
          <AiFillCaretUp size={20} />
        </button>
      </div>
    </div>
  );
};

export default BreakLength;
