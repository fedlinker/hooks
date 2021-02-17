import React from "react";
import { useLocalStorage } from "@fedlinker/hooks";

function Example() {
  const [value, { set, remove }] = useLocalStorage("random", 0);

  function handleSetClick() {
    set(Math.round(Math.random() * 10));
  }

  return (
    <>
      <button onClick={handleSetClick}>
        Set random number in localStorage
      </button>
      <button onClick={remove}>Remove</button>
      {value}
    </>
  );
}

export default Example;
