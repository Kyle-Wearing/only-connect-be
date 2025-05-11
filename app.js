const express = require("express");
const cors = require("cors");
const app = express();

const { login } = require("./api");

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).send({ endpoints: "test" });
});

app.post("/api/login", async (req, res) => {
  console.log("Route /api/login hit");

  const { username } = req.body;
  try {
    const data = await login(username);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

module.exports = app;
