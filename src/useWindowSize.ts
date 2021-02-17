import { useEffect, useState } from "react";
import { canUseDOM } from "./utils";

function useWindowSize() {
  const [[width, height], setState] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    function listener() {
      setState([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener("resize", listener);
    window.addEventListener("orientationchange", listener);

    return () => {
      window.removeEventListener("resize", listener);
      window.removeEventListener("orientationchange", listener);
    };
  }, []);

  return [width, height] as const;
}

const useNoop: typeof useWindowSize = () => [0, 0];

export default canUseDOM ? useWindowSize : useNoop;
