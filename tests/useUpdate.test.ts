import { act, renderHook } from "@testing-library/react-hooks";
import { useUpdate } from "@fedlinker/hooks";
import { useState } from "react";

describe("useUpdate", () => {
  it("should run `effect` after the component is updated without deps", () => {
    const destroy = jest.fn();
    const create = jest.fn().mockReturnValue(destroy);
    const { rerender, unmount } = renderHook(() => {
      useUpdate(create);
    });

    expect(create).toBeCalledTimes(0);
    expect(destroy).toBeCalledTimes(0);
    rerender();
    expect(create).toBeCalledTimes(1);
    expect(destroy).toBeCalledTimes(0);
    rerender();
    expect(create).toBeCalledTimes(2);
    expect(destroy).toBeCalledTimes(1);
    unmount();
    expect(create).toBeCalledTimes(2);
    expect(destroy).toBeCalledTimes(2);
  });

  it("should run `effect` after the `deps` are changed", () => {
    const destroy = jest.fn();
    const create = jest.fn().mockReturnValue(destroy);
    const { rerender, unmount, result } = renderHook(() => {
      const [dependency, changeDependency] = useState({});
      useUpdate(create, [dependency]);
      return { changeDependency };
    });
    const { changeDependency } = result.current;

    expect(create).toBeCalledTimes(0);
    expect(destroy).toBeCalledTimes(0);
    rerender();
    expect(create).toBeCalledTimes(0);
    expect(destroy).toBeCalledTimes(0);
    act(() => changeDependency({}));
    expect(create).toBeCalledTimes(1);
    expect(destroy).toBeCalledTimes(0);
    act(() => changeDependency({}));
    expect(create).toBeCalledTimes(2);
    expect(destroy).toBeCalledTimes(1);
    rerender();
    expect(create).toBeCalledTimes(2);
    expect(destroy).toBeCalledTimes(1);
    unmount();
    expect(create).toBeCalledTimes(2);
    expect(destroy).toBeCalledTimes(2);
  });

  it("should not run `effect` with an empty array as deps", () => {
    const destroy = jest.fn();
    const create = jest.fn().mockReturnValue(destroy);
    const { rerender, unmount } = renderHook(() => {
      useUpdate(create, []);
    });

    expect(create).toBeCalledTimes(0);
    expect(destroy).toBeCalledTimes(0);
    rerender();
    expect(create).toBeCalledTimes(0);
    expect(destroy).toBeCalledTimes(0);
    rerender();
    expect(create).toBeCalledTimes(0);
    expect(destroy).toBeCalledTimes(0);
    unmount();
    expect(create).toBeCalledTimes(0);
    expect(destroy).toBeCalledTimes(0);
  });
});
