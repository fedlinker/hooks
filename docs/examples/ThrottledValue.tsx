import React, { useState } from "react";
import { useThrottledValue } from "@fedlinker/hooks";

function Example() {
  const [value, setValue] = useState("");
  const [throttledValue, { flush }] = useThrottledValue(value, 1000);

  return (
    <div>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Please input..."
      />
      <button onClick={() => flush()}>Ok</button>
      <div>Throttled value: {throttledValue}</div>
    </div>
  );
}

export default Example;
