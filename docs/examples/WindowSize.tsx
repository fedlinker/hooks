import { useWindowSize } from "@fedlinker/hooks";

function Example() {
  const [width, height] = useWindowSize();
  return `Width: ${width}; Height: ${height}`;
}

export default Example;
