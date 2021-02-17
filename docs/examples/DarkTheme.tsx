import { useDarkTheme } from "@fedlinker/hooks";

function Example() {
  const theme = useDarkTheme() ? "dark" : "light";
  return "Current theme is: " + theme;
}

export default Example;
