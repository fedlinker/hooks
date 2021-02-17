const path = require("path");

exports.onCreateWebpackConfig = (args) => {
  args.actions.setWebpackConfig({
    resolve: {
      alias: {
        "@fedlinker/hooks": path.resolve(__dirname, "../src/"),
      },
    },
  });
};
