import React, { useState } from "react";
import { useDebouncedValue } from "@fedlinker/hooks";

function Example() {
  const [value, setValue] = useState("");
  const [debouncedValue, { flush }] = useDebouncedValue(value, 1000);

  return (
    <div>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Please input..."
      />
      <button onClick={() => flush()}>Ok</button>
      <div>Debounced value: {debouncedValue}</div>
    </div>
  );
}

export default Example;
