import { useEffect, useState } from "react";
import { canUseDOM } from "./utils";

const query = "(prefers-color-scheme: dark)";

function useDarkTheme(): boolean {
  const [media] = useState(() => window.matchMedia(query));
  const [state, setState] = useState(media.matches);

  useEffect(() => {
    function listener(event: MediaQueryListEvent) {
      setState(event.matches);
    }

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [media]);

  return state;
}

const useNoop: typeof useDarkTheme = () => false;

export default canUseDOM ? useDarkTheme : useNoop;
