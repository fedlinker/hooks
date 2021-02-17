import React, { useState } from "react";
import { useTimeout } from "@fedlinker/hooks";

function Example() {
  const [imperative, setImperative] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [ms, setMs] = useState(1000);

  const [count, setCount] = useState(0);
  const [start, cancel] = useTimeout(
    () => {
      setCount((count) => ++count);
    },
    ms,
    { imperative, disabled }
  );

  return (
    <>
      <button onClick={start}>Start</button>
      <button onClick={cancel}>Cancel</button>
      <button
        onClick={() => {
          setMs(Math.round(Math.random() * 10000));
        }}
      >
        Random delay time
      </button>
      <input
        type="checkbox"
        checked={imperative}
        onChange={(event) => {
          setImperative(event.target.checked);
        }}
      />{" "}
      Imperative
      <input
        type="checkbox"
        checked={disabled}
        onChange={(event) => {
          setDisabled(event.target.checked);
        }}
      />{" "}
      Disabled
      <br />
      Delay time: {ms}. Count: {count}
    </>
  );
}

export default Example;
