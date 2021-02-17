import { useEffect, useLayoutEffect } from "react";
import { canUseDOM } from "./utils";

const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
