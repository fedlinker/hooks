export const canUseDOM =
  typeof window !== "undefined" && typeof document !== "undefined";

export const is =
  Object.is ||
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#polyfill
  function (value1: any, value2: any) {
    if (value1 === value2) {
      return value1 !== 0 || 1 / value1 === 1 / value2;
    } else {
      // eslint-disable-next-line
      return value1 !== value1 && value2 !== value2;
    }
  };
