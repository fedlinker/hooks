import { act, renderHook } from "@testing-library/react-hooks";
import { useRerender } from "@fedlinker/hooks";

describe("useRerender", () => {
  it("should update component when call rerender function", () => {
    let count = 0;
    const { rerender, result } = renderHook(() => {
      count++;
      return useRerender();
    });

    expect(count).toBe(1);
    rerender();
    expect(count).toBe(2);
    act(() => {
      result.current();
    });
    expect(count).toBe(3);
    act(() => {
      result.current();
    });
    expect(count).toBe(4);
  });

  it("should return same function at any time", () => {
    const { rerender, result } = renderHook(() => {
      return useRerender();
    });
    const tmp1 = result.current;
    rerender();
    const tmp2 = result.current;
    act(() => result.current());
    const tmp3 = result.current;

    expect(tmp1).toBe(tmp2);
    expect(tmp1).toBe(tmp3);
  });
});
