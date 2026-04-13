const assert = require("assert");
const { When, Then } = require("@cucumber/cucumber");

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3000";

When("я отправляю GET запрос на {string}", async function (path) {
  const url = new URL(path, baseUrl).href;
  const res = await fetch(url);
  this.response = res;
  this.bodyText = await res.text();
});

Then("код ответа должен быть {int}", async function (expected) {
  assert.strictEqual(this.response.status, expected);
});

Then("тело ответа должно содержать {string}", async function (substring) {
  assert.ok(this.bodyText.includes(substring), `Expected body to include "${substring}", got: ${this.bodyText}`);
});
