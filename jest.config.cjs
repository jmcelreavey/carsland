/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest-singleton.ts"],
  moduleNameMapper: {
    "^~(.*)$": "<rootDir>/src$1",
  },
};
