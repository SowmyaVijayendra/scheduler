import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  function transition(value, replace = false) {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), value]);
    } else {
      setHistory((prev) => [...prev, value]);
    }
  }
  function back() {
    if (history.length > 1) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
    }
  }
  return {
    mode: history[history.length - 1],
    transition,
    back,
  };
}
