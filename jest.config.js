module.exports = {
  roots: ["<rootDir>/tests"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  resetMocks: true,
  moduleNameMapper: {
    "@fedlinker/hooks": "<rootDir>/src",
  },
};
