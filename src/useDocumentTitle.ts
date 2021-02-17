import { useRef } from "react";
import useUnmount from "./useUnmount";
import { canUseDOM } from "./utils";

function useDocumentTitle(title: string, options?: { restore?: boolean }) {
  const previousTitleRef = useRef(document.title);

  document.title = title;

  useUnmount(() => {
    if (options && options.restore) {
      document.title = previousTitleRef.current;
    }
  });
}

const useNoop: typeof useDocumentTitle = () => {};

export default canUseDOM ? useDocumentTitle : useNoop;
