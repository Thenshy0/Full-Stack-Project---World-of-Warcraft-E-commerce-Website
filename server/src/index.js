const express = require("express");
const morgan = require("morgan");

const dev = require("./config");
const connectDB = require("./config/db");

const app = express();

const PORT = dev.app.serverPort;
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is good" });
});

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
  connectDB();
});
