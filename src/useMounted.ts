import { useEffect, useRef } from "react";

function useMounted() {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
  }, []);

  return mountedRef.current;
}

export default useMounted;
