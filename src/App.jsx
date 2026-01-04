import { useState } from "react";
import "./App.css";

function App() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = (value) => {
    if (value === "C") {
      setExpression("");
      setResult("");
      return;
    }

    if (value === "DEL") {
      setExpression((prev) => prev.slice(0, -1));
      return;
    }

    if (value === "=") {
      if (!expression.trim()) return;
      try {
        const sanitized = expression.replace(/×/g, "*").replace(/÷/g, "/");
        const evalResult = eval(sanitized);
        setResult(formatNumber(evalResult));
      } catch (e) {
        setResult("Error");
      }
      return;
    }
    setExpression((prev) => prev + value);
  };

  const buttons = [
    "7", "8", "9", "÷",
    "4", "5", "6", "×",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
  ];

  function formatNumber(value) {
    if (typeof value !== 'number' || !isFinite(value)) {
      return String(value);
    }

    const rounded = Number(value.toFixed(12));

    let text = rounded.toString();

    if (!text.includes(".")) return text;

    text = text.replace(/\.?0+$/, "");

    return text;
  }

  return (
    <div className="calculator-wrapper">
      <h1 className="title">Calculator</h1>
      <div className="calculator">
        <div className="display">
          <div className="expression">{expression || "0"}</div>
          <div className="result">{result !== "" ? result : ""}</div>
        </div>
        <div className="controls-row">
          <button
            className="btn btn-secondary"
            onClick={() => handleButtonClick("C")}
          >
            C
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleButtonClick("DEL")}
          >
            DEL
          </button>
        </div>
        <div className="buttons-grid">
          {buttons.map((btn) => (
            <button
              key={btn}
              className={`btn ${["÷", "×", "-", "+", "="].includes(btn)
                ? "btn-operator"
                : "btn-number"
                }`}
              onClick={() => handleButtonClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;