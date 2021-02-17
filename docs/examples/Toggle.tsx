import React from "react";
import { useToggle } from "@fedlinker/hooks";

function Example() {
  const [visible, { toggle, toggleOn, toggleOff }] = useToggle(true);

  return (
    <>
      <button onClick={() => toggle()}>Toggle</button>
      <button onClick={toggleOn}>Toggle on</button>
      <button onClick={toggleOff}>Toggle off</button>
      <p style={{ display: visible ? "block" : "none" }}>
        Example text can be toggled to display or not by the buttons above.
      </p>
    </>
  );
}

export default Example;
