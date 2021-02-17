import { useCallback, useEffect, useRef } from "react";
import usePersistedCallback from "./usePersistedCallback";
import useUnmount from "./useUnmount";
import useUpdate from "./useUpdate";

function useTimeout(
  fn: () => void,
  ms: number = 0,
  options?: { imperative?: boolean; disabled?: boolean }
) {
  const imperative = !!options && !!options.imperative;
  const disabled = !!options && !!options.disabled;

  const optionsRef = useRef({ imperative, disabled, ms });
  optionsRef.current = { imperative, disabled, ms };

  const handler = usePersistedCallback(fn);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const cancel = useCallback(() => {
    if (timerRef.current !== undefined) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  const start = useCallback(
    () => {
      cancel();
      if (!optionsRef.current.disabled) {
        timerRef.current = setTimeout(handler, optionsRef.current.ms);
      }
    },
    // eslint-disable-next-line
    []
  );

  useEffect(
    () => {
      if (!imperative && !disabled) {
        start();
        return cancel;
      }
    },
    // eslint-disable-next-line
    [imperative, disabled, ms]
  );

  useUpdate(
    () => {
      if (optionsRef.current.imperative && disabled) {
        cancel();
      }
    },
    // eslint-disable-next-line
    [disabled]
  );

  useUpdate(
    () => {
      if (optionsRef.current.imperative && timerRef.current !== undefined) {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(handler, optionsRef.current.ms);
      }
    },
    // eslint-disable-next-line
    [ms]
  );

  useUnmount(cancel);

  return [start, cancel] as const;
}

export default useTimeout;
