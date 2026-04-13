/**
 * Простая логика для unit-тестов (без HTTP).
 * @param {string} name
 * @returns {string}
 */
function buildGreeting(name) {
  const safe = String(name || "").trim() || "гость";
  return `Привет, ${safe}!`;
}

module.exports = { buildGreeting };
