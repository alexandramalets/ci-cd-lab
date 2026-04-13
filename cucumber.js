module.exports = {
  default: {
    paths: ["features/**/*.feature"],
    import: ["features/step_definitions/**/*.js"],
    format: ["allure-cucumberjs/reporter"],
    formatOptions: {
      resultsDir: "allure-results",
    },
  },
};
