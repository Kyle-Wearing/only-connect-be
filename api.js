const https = require("https");

const baseURL = "https://apex.oracle.com/pls/apex/onlyconnect/api/";

async function login(username) {
  const options = {
    hostname: "apex.oracle.com", // Replace with the actual hostname
    port: 443, // 443 is the default for https
    path: "/pls/apex/onlyconnect/api/login", // The endpoint
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(JSON.stringify({ username })),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const response = JSON.parse(data); // Parse the JSON response
          resolve(response); // Resolve with the response data
        } catch (error) {
          reject(new Error("Error parsing response")); // Reject if parsing fails
        }
      });
    });

    req.on("error", (err) => {
      reject(err); // Reject the promise if the request fails
    });

    // Write the body data to the request
    req.write(JSON.stringify({ username }));

    req.end(); // End the request
  });
}

module.exports = { login };
