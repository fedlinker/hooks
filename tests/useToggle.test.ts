import { act, renderHook } from "@testing-library/react-hooks";
import { useToggle } from "@fedlinker/hooks";

describe("useToggle", () => {
  it("should set value correctly", () => {
    const { rerender, result } = renderHook((value) => useToggle(value), {
      initialProps: true,
    });

    expect(result.current[0]).toBe(true);
    rerender(false);
    expect(result.current[0]).toBe(true);
    act(() => result.current[1].toggle());
    expect(result.current[0]).toBe(false);
    act(() => result.current[1].toggle());
    expect(result.current[0]).toBe(true);
    act(() => result.current[1].toggle(false));
    expect(result.current[0]).toBe(false);
    act(() => result.current[1].toggle(true));
    expect(result.current[0]).toBe(true);
    act(() => result.current[1].toggleOff());
    expect(result.current[0]).toBe(false);
    act(() => result.current[1].toggleOff());
    expect(result.current[0]).toBe(false);
    act(() => result.current[1].toggleOn());
    expect(result.current[0]).toBe(true);
    act(() => result.current[1].toggleOn());
    expect(result.current[0]).toBe(true);
  });

  it("should not change toggle functions when component rerender", () => {
    const { result, rerender } = renderHook(() => useToggle());
    const temp1 = result.current[1];
    rerender();
    const temp2 = result.current[1];
    rerender();
    const temp3 = result.current[1];

    expect(temp1.toggle).toEqual(temp2.toggle);
    expect(temp1.toggle).toEqual(temp3.toggle);
    expect(temp1.toggleOn).toEqual(temp2.toggleOn);
    expect(temp1.toggleOn).toEqual(temp3.toggleOn);
    expect(temp1.toggleOff).toEqual(temp2.toggleOff);
    expect(temp1.toggleOff).toEqual(temp3.toggleOff);
  });
});
