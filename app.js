const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();

const { login } = require("./api");

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).send({ endpoints: "test" });
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  login(username)
    .then((response) => {
      return Promise.all([
        bcrypt.compare(password, response.password),
        response.user_id,
      ]);
    })
    .then(([verification, user_id]) => {
      if (verification) {
        res.status(200).send({ user_id });
      } else {
        res.status(400).send({ err: "password incorrect" });
      }
    })
    .catch((err) => {
      res.status(500).send({ msg: "internal server error" });
    });
});

module.exports = app;
