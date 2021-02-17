import React from "react";
import { useSessionStorage } from "@fedlinker/hooks";

function Example() {
  const [value, { set, remove }] = useSessionStorage("random", 0);

  function handleSetClick() {
    set(Math.round(Math.random() * 10));
  }

  return (
    <>
      <button onClick={handleSetClick}>
        Set random number in sessionStorage
      </button>
      <button onClick={remove}>Remove</button>
      {value}
    </>
  );
}

export default Example;
