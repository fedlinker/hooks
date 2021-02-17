import { useCallback, useRef, useState } from "react";
import useUnmount from "./useUnmount";
import useUpdate from "./useUpdate";
import { is } from "./utils";

export interface FlushCallback<T> {
  (): void;
  (finalValue: T): void;
}

function createUseDelayedValue(type: "throttled" | "debounced") {
  return function useDelayedValue<T = any>(value: T, wait: number = 0) {
    const valueRef = useRef(value);
    valueRef.current = value;

    const timerRef = useRef<ReturnType<typeof setTimeout>>();
    const [delayedValue, setDelayedValue] = useState(value);
    const delayedValueRef = useRef(delayedValue);

    const changeValue = useCallback((newValue: T) => {
      if (!is(delayedValueRef.current, newValue)) {
        delayedValueRef.current = newValue;
        setDelayedValue(newValue);
      }
    }, []);

    const cancel = useCallback(() => {
      if (timerRef.current !== undefined) {
        clearTimeout(timerRef.current);
        timerRef.current = undefined;
      }
    }, []);

    const flush = useCallback<FlushCallback<T>>(
      function flushValue(finalValue?: T) {
        cancel();
        if (arguments.length > 0) {
          changeValue(finalValue as T);
        } else {
          changeValue(valueRef.current);
        }
      },
      // eslint-disable-next-line
      []
    );

    const handler = useCallback(
      () => {
        cancel();
        changeValue(valueRef.current);
      },
      // eslint-disable-next-line
      []
    );

    useUpdate(
      () => {
        if (timerRef.current !== undefined) {
          clearTimeout(timerRef.current);
          timerRef.current = setTimeout(handler, wait);
        }
      },
      // eslint-disable-next-line
      [wait]
    );

    useUpdate(
      () => {
        if (type === "throttled") {
          if (
            timerRef.current === undefined &&
            !is(delayedValueRef.current, value)
          ) {
            timerRef.current = setTimeout(handler, wait);
          }
        }

        if (type === "debounced") {
          cancel();
          if (!is(delayedValueRef.current, value)) {
            timerRef.current = setTimeout(handler, wait);
          }
        }
      },
      // eslint-disable-next-line
      [value]
    );

    useUnmount(cancel);

    return [delayedValue, { flush, cancel }] as const;
  };
}

export default createUseDelayedValue;
