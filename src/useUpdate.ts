import { DependencyList, EffectCallback, useEffect, useRef } from "react";

function useUpdate(effect: EffectCallback, deps?: DependencyList) {
  const mountedRef = useRef(false);

  useEffect(
    () => {
      if (mountedRef.current) {
        return effect();
      } else {
        mountedRef.current = true;
      }
    },
    // eslint-disable-next-line
    deps
  );
}

export default useUpdate;
