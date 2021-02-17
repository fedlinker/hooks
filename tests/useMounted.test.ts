import { renderHook } from "@testing-library/react-hooks";
import { useMounted } from "@fedlinker/hooks";

describe("useMounted", () => {
  it("should return correct value", () => {
    const { rerender, result, unmount } = renderHook(() => useMounted());
    expect(result.current).toBe(false);
    rerender();
    expect(result.current).toBe(true);
    rerender();
    expect(result.current).toBe(true);
    unmount();
    expect(result.current).toBe(true);
  });
});
