import { renderHook } from "@testing-library/react-hooks";
import { useOnceEffect } from "@fedlinker/hooks";

describe("useOnceEffect", () => {
  it("should run `effect` only once", () => {
    const destroyMock = jest.fn();
    const createMock = jest.fn(() => destroyMock);
    const { rerender, unmount } = renderHook(() => useOnceEffect(createMock));

    expect(createMock).toBeCalledTimes(1);
    expect(destroyMock).toBeCalledTimes(0);
    rerender();
    expect(createMock).toBeCalledTimes(1);
    expect(destroyMock).toBeCalledTimes(0);
    rerender();
    expect(createMock).toBeCalledTimes(1);
    expect(destroyMock).toBeCalledTimes(0);
    unmount();
    expect(createMock).toBeCalledTimes(1);
    expect(destroyMock).toBeCalledTimes(1);
  });
});
