import React, { useState } from "react";
import { useNextFrame, useTimeout } from "@fedlinker/hooks";

const duration = 1000;

function Example() {
  const [display, setDisplay] = useState(false);
  const [visible, setVisible] = useState(false);

  const [startVisible, cancelVisible] = useNextFrame(
    () => {
      setVisible(true);
    },
    { imperative: true }
  );

  const [startHide, cancelHide] = useTimeout(
    () => {
      setDisplay(false);
    },
    duration,
    { imperative: true }
  );

  function handleShowClick() {
    cancelHide();
    setDisplay(true);
    startVisible();
  }

  function handleHideClick() {
    cancelVisible();
    setVisible(false);
    startHide();
  }

  return (
    <div>
      <button onClick={handleShowClick}>Show</button>
      <button onClick={handleHideClick}>Hide</button>
      <div
        style={{
          display: display ? "block" : "none",
          opacity: visible ? 1 : 0,
          transition: `opacity ease ${duration / 1000}s`,
          width: 100,
          height: 100,
          backgroundColor: "cyan",
        }}
      ></div>
    </div>
  );
}

export default Example;
