import React from "react";

function Toolbar(props){
  return (
    <div className="controls">

      <button onClick={() => props.setIsEnglish(en => !en)}>
        {props.isEnglish ? "Switch to Hebrew" : "Switch to English"}
      </button>

      <button onClick={() => props.setIsUpperCase(u => !u)}>
        {props.isUpperCase ? "Lowercase" : "Uppercase"}
      </button>

      <button
        onClick={() => props.onBoldChange(b => !b)}
        style={{ fontWeight: props.isBold ? "bold" : "normal" }}
      >
        B
      </button>

      <button
        onClick={() => props.onItalicChange(i => !i)}
        style={{ fontStyle: props.isItalic ? "italic" : "normal" }}
      >
        I
      </button>

        <button 
            onClick={() => props.onUnderlineChange(u => !u)}
            style={{textDecoration: props.isUnderline ? 'underline' : 'none'}}
        >
            U
        </button>

        <select
            value={props.selectedFont}
            onChange={(e) => props.onSelectedFontChange(e.target.value)}
        >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
        </select>

      <input
        type="number"
        value={props.selectedFontSize}
        onChange={(e) => props.onSelectedFontSizeChange(parseInt(e.target.value))}
        style={{ width: "50px" }}
      />

      <input
        type="color"
        value={props.selectedColor}
        onChange={(e) => props.onSelectedColorChange(e.target.value)}
      />
    </div>
  );
};

export default Toolbar;
