import { EffectCallback, useEffect } from "react";

function useOnceEffect(effect: EffectCallback) {
  // eslint-disable-next-line
  useEffect(effect, []);
}

export default useOnceEffect;
