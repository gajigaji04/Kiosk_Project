const express = require("express");

const port = 3000; // Replace 3000 with your desired port number

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
