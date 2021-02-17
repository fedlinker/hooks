import { useRef } from "react";

function usePersistedCallback<T extends (...args: any[]) => any>(
  callback: T
): T {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const persistedCallbackRef = useRef<T>(function (this: any, ...args) {
    return callbackRef.current.apply(this, args);
  } as T);

  return persistedCallbackRef.current;
}

export default usePersistedCallback;
