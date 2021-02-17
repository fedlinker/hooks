import { useCallback, useState } from "react";

function useRerender() {
  const [, setState] = useState({});

  const rerender = useCallback(() => {
    setState({});
  }, []);

  return rerender;
}

export default useRerender;
