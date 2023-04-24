const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dev = require("./config");
const connectDB = require("./config/db");
const userRouter = require("./routes/users");
const adminRouter = require("./routes/admin");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const createError = require("http-errors");

const app = express();

const PORT = dev.app.serverPort;
app.use(cookieParser());
app.use(
  cors({
    original: ["http://127.0.0.1:3000", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);
app.use("/public", express.static("public"));

// API TEST
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is good" });
});

app.listen(PORT, async () => {
  console.log(`server is running at http://localhost:${PORT}`);
  await connectDB();
});

app.use((req, res, next) => {
  next(createError(404, "Not Found"));
});
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});
