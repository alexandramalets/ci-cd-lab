const { buildGreeting } = require("../lib/greeting");

describe("buildGreeting", () => {
  it("формирует приветствие с именем", () => {
    expect(buildGreeting("Анна")).toBe("Привет, Анна!");
  });

  it("подставляет гостя при пустой строке", () => {
    expect(buildGreeting("   ")).toBe("Привет, гость!");
  });
});
