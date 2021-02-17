import { useCallback, useRef } from "react";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";
import useLayoutUpdate from "./useLayoutUpdate";
import usePersistedCallback from "./usePersistedCallback";
import useUnmount from "./useUnmount";

function useNextFrame(
  fn: () => void,
  options?: { imperative?: boolean; disabled?: boolean }
) {
  const imperative = !!options && !!options.imperative;
  const disabled = !!options && !!options.disabled;

  const optionsRef = useRef({ imperative, disabled });
  optionsRef.current = { imperative, disabled };

  const handler = usePersistedCallback(fn);
  const timerRef = useRef<number>();

  const cancel = useCallback(() => {
    if (timerRef.current !== undefined) {
      cancelAnimationFrame(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  const start = useCallback(
    () => {
      if (!optionsRef.current.disabled) {
        // Use `requestAnimationFrame` twice to ensure the `fn` is invoked after
        // the current painting in all browsers.
        // See: https://github.com/whatwg/html/issues/2569
        timerRef.current = requestAnimationFrame(() => {
          timerRef.current = requestAnimationFrame(handler);
        });
      }
    },
    // eslint-disable-next-line
    []
  );

  useIsomorphicLayoutEffect(
    () => {
      if (!imperative && !disabled) {
        start();
        return cancel;
      }
    },
    // eslint-disable-next-line
    [imperative, disabled]
  );

  useLayoutUpdate(
    () => {
      if (optionsRef.current.imperative && disabled) {
        cancel();
      }
    },
    // eslint-disable-next-line
    [disabled]
  );

  useUnmount(cancel);

  return [start, cancel] as const;
}

export default useNextFrame;
