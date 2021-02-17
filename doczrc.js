module.exports = {
  base: "/hooks/",
  src: "./docs",
  typescript: true,
  title: "@fedlinker/hooks",
  menu: [
    "Getting Started",
    {
      name: "Lifycycles",
      menu: ["useMount", "useUpdate", "useLayoutUpdate", "useUnmount"],
    },
    {
      name: "Effects",
      menu: ["useIsomorphicLayoutEffect", "useOnceEffect"],
    },
    {
      name: "State",
      menu: [
        "useMounted",
        "useToggle",
        "useDebouncedValue",
        "useThrottledValue",
      ],
    },
    {
      name: "Callbacks",
      menu: ["useRerender", "usePersistedCallback"],
    },
    {
      name: "Event Loop",
      menu: ["useTimeout", "useInterval", "useRaf", "useNextFrame"],
    },
    {
      name: "DOM and BOM",
      menu: [
        "useDocumentTitle",
        "useDarkTheme",
        "useWindowSize",
        "useLocalStorage",
        "useSessionStorage",
      ],
    },
  ],
};
