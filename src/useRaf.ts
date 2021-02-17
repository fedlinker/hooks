import { useCallback, useRef } from "react";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";
import useLayoutUpdate from "./useLayoutUpdate";
import useUnmount from "./useUnmount";

function useRaf(
  fn: (percentage: number) => void,
  duration: number = 0,
  options?: { imperative?: boolean; disabled?: boolean }
) {
  const imperative = !!options && !!options.imperative;
  const disabled = !!options && !!options.disabled;

  const optionsRef = useRef({ imperative, disabled, duration, fn });
  optionsRef.current = { imperative, disabled, duration, fn };

  const timerRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const cancel = useCallback(() => {
    if (timerRef.current !== undefined) {
      cancelAnimationFrame(timerRef.current);
      timerRef.current = undefined;
    }
    startTimeRef.current = undefined;
  }, []);

  const step = useCallback((timestamp: number) => {
    if (startTimeRef.current === undefined) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;

    let percentage =
      optionsRef.current.duration > 0
        ? elapsed / optionsRef.current.duration
        : 1;

    if (percentage < 0) percentage = 0;
    if (percentage > 1) percentage = 1;

    optionsRef.current.fn(percentage);

    if (percentage < 1) {
      timerRef.current = requestAnimationFrame(step);
    }
  }, []);

  const start = useCallback(
    () => {
      cancel();
      if (!optionsRef.current.disabled) {
        timerRef.current = requestAnimationFrame(step);
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
    [imperative, disabled, duration]
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

  useLayoutUpdate(
    () => {
      if (optionsRef.current.imperative && timerRef.current !== undefined) {
        cancelAnimationFrame(timerRef.current);
        timerRef.current = requestAnimationFrame(step);
      }
    },
    // eslint-disable-next-line
    [duration]
  );

  useUnmount(cancel);

  return [start, cancel] as const;
}

export default useRaf;
