/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "allure-jest/node",
  testMatch: ["**/tests/**/*.test.js"],
  testPathIgnorePatterns: ["/node_modules/", "/e2e/"],
};
