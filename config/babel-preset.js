module.exports = function (api, options = {}) {
  const isTest = api.env("test");
  const isDev = api.env("development");

  const { target } = options;
  const isCJS = target === "cjs";
  const isESM = target === "esm";

  return {
    presets: [
      [
        "@babel/preset-env",
        isTest
          ? {
              targets: { node: true },
              bugfixes: true,
            }
          : {
              bugfixes: true,
              modules: isCJS ? "cjs" : isESM ? false : "auto",
            },
      ],
      [
        "@babel/preset-react",
        {
          development: isDev || isTest,
        },
      ],
      [
        "@babel/preset-typescript",
        {
          isTSX: true,
          allExtensions: true,
        },
      ],
    ],
    plugins: [
      [
        "@babel/plugin-transform-runtime",
        {
          useESModules: isESM,
          version: "^7.7.4",
        },
      ],
    ],
  };
};
