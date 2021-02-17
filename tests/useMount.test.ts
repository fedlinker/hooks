import { renderHook } from "@testing-library/react-hooks";
import { useMount } from "@fedlinker/hooks";

describe("useMount", () => {
  it("should run `effect` function after the component is mounted", () => {
    const mock = jest.fn();
    const { rerender, unmount } = renderHook(() => useMount(mock));

    expect(mock).toBeCalledTimes(1);
    rerender();
    expect(mock).toBeCalledTimes(1);
    unmount();
    expect(mock).toBeCalledTimes(1);
  });
});
