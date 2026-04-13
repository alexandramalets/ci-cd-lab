const express = require("express");
const path = require("path");
const { version } = require("./package.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "lab6" });
});

app.get("/api/version", (req, res) => {
  res.status(200).json({ version });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

module.exports = { app };
