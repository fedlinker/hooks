import { useEffect } from "react";

function useMount(effect: () => void) {
  useEffect(
    () => {
      effect();
    },
    // eslint-disable-next-line
    []
  );
}

export default useMount;
