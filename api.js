const axios = require("axios");

const api = axios.create({
  baseURL: "https://apex.oracle.com/pls/apex/onlyconnect/api/",
});

async function login(username) {
  return api
    .post("/login", { username: username })
    .then((response) => {
      console.log("here");
      return response;
    })
    .catch((err) => {
      return err;
    });
}

module.exports = { login };
