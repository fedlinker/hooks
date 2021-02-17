import useTimeout from "./useTimeout";

function useInterval(
  fn: () => void,
  ms: number = 0,
  options?: { imperative?: boolean; disabled?: boolean }
) {
  const [start, cancel] = useTimeout(
    () => {
      fn();
      start();
    },
    ms,
    options
  );

  return [start, cancel] as const;
}

export default useInterval;
