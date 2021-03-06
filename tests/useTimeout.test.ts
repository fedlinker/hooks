import { renderHook } from "@testing-library/react-hooks";
import { useTimeout } from "@fedlinker/hooks";

describe("useTimeout", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should run `effect` automatically by default", () => {
    const mock = jest.fn();
    renderHook(() => useTimeout(mock));

    expect(mock).not.toHaveBeenCalled();
    jest.advanceTimersByTime(0);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it("should handle `ms` param correctly", () => {
    const mock = jest.fn();
    renderHook(() => useTimeout(mock, 1000));

    expect(mock).not.toHaveBeenCalled();
    jest.advanceTimersByTime(500);
    expect(mock).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it("should be controlled by `options.disabled`", () => {
    const mock = jest.fn();
    const { rerender } = renderHook(
      (disabled) => useTimeout(mock, 0, { disabled }),
      { initialProps: true }
    );

    expect(mock).not.toBeCalled();
    jest.advanceTimersByTime(1000);
    expect(mock).not.toBeCalled();
    rerender(false);
    expect(mock).not.toBeCalled();
    jest.advanceTimersByTime(0);
    expect(mock).toBeCalledTimes(1);
    rerender(true);
    rerender(false);
    jest.advanceTimersByTime(0);
    expect(mock).toBeCalledTimes(2);
  });

  it("should reset timer when the `ms` param change", () => {
    const mock = jest.fn();
    const { rerender } = renderHook((ms) => useTimeout(mock, ms), {
      initialProps: 10,
    });

    expect(mock).not.toBeCalled();
    jest.advanceTimersByTime(9);
    expect(mock).not.toBeCalled();
    jest.advanceTimersByTime(10);
    expect(mock).toBeCalledTimes(1);
    rerender(20);
    expect(mock).toBeCalledTimes(1);
    jest.advanceTimersByTime(19);
    expect(mock).toBeCalledTimes(1);
    jest.advanceTimersByTime(20);
    expect(mock).toBeCalledTimes(2);
    rerender(30);
    jest.advanceTimersByTime(20);
    expect(mock).toBeCalledTimes(2);
    rerender(40);
    expect(mock).toBeCalledTimes(2);
    jest.advanceTimersByTime(35);
    expect(mock).toBeCalledTimes(2);
    jest.advanceTimersByTime(40);
    expect(mock).toBeCalledTimes(3);
  });

  it("should run last updated `effect`", () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    const mock3 = jest.fn();

    const { rerender } = renderHook(
      ({ callback, disabled }) => useTimeout(callback, 1000, { disabled }),
      { initialProps: { callback: mock1, disabled: false } }
    );

    expect(mock1).not.toBeCalled();
    jest.advanceTimersByTime(500);
    expect(mock1).not.toBeCalled();
    rerender({ callback: mock2, disabled: true });
    jest.advanceTimersByTime(1000);
    expect(mock2).not.toBeCalled();
    rerender({ callback: mock3, disabled: false });
    jest.advanceTimersByTime(1000);
    expect(mock3).toBeCalledTimes(1);
    expect(mock1).not.toBeCalled();
    expect(mock2).not.toBeCalled();
  });

  it("should clear timer on unmount", () => {
    const mock = jest.fn();
    const { rerender, unmount } = renderHook(() => useTimeout(mock, 10));

    jest.advanceTimersByTime(9);
    rerender();
    unmount();
    jest.advanceTimersByTime(11);
    expect(mock).not.toBeCalled();
  });
});
