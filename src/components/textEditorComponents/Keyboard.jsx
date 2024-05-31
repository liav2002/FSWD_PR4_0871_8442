import React, { useState } from "react";
import "./css_modules/Keyboard.module.css";

const specialKeys = "~!@#$%^&*()_+".split("");
const numberKeys = "`1234567890-=".split("");

const englishKeysUpper = [
  "QWERTYUIOP[]".split(""),
  "ASDFGHJKL;'\\".split(""),
  "ZXCVBNM,./".split(""),
];
const englishKeysLower = [
  "qwertyuiop[]".split(""),
  "asdfghjkl;'\\".split(""),
  "zxcvbnm,./".split(""),
];
const hebrewKeys = [
  "/'קראטוןםפ][".split(""),
  "שדגכעיחלךף,\\".split(""),
  "זסבהנמצתץ.".split(""),
];

function Keyboard({ onKeyPress, isEnglish, isUpperCase }) {
  const [shiftPressed, setShiftPressed] = useState(false);

  const keys = [
    shiftPressed ? specialKeys : numberKeys,
    ...(isEnglish
      ? isUpperCase
        ? englishKeysUpper
        : englishKeysLower
      : hebrewKeys),
  ];

  const handleKeyPress = (key) => {
    onKeyPress(key);
  };

  const handleShiftPress = () => {
    setShiftPressed(!shiftPressed);
  };

  return (
    <div>
      <div className="keyboard">
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key) => (
              <button key={key} onClick={() => handleKeyPress(key)}>
                {key}
              </button>
            ))}
          </div>
        ))}
        <div className="keyboard-row">
        <button
            className={shiftPressed ? "shift-active" : ""}
            onClick={handleShiftPress}
          >
            Shift
          </button>
          <button onClick={() => handleKeyPress("\n")}>Enter</button>
          <button onClick={() => handleKeyPress(" ")}>Space</button>
          <br />
          <button onClick={() => handleKeyPress("undo")}>Undo</button>
          <button onClick={() => handleKeyPress("clear")}>Clear</button>
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
