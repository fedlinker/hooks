import React, { useState } from "react";
import { useRaf } from "@fedlinker/hooks";

function Example() {
  const [imperative, setImperative] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [duration, setDuration] = useState(1000);

  const [percentage, setPercentage] = useState(0);
  const [start, cancel] = useRaf(setPercentage, duration, {
    imperative,
    disabled,
  });

  return (
    <>
      <button onClick={start}>Start</button>
      <button onClick={cancel}>Cancel</button>
      <button
        onClick={() => {
          setDuration(Math.round(Math.random() * 10000));
        }}
      >
        Random duration time
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
      Duration time: {duration}. Progress:{" "}
      <progress max="100" value={percentage * 100}>
        {percentage * 100}
      </progress>
    </>
  );
}

export default Example;
