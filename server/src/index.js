const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dev = require("./config");
const connectDB = require("./config/db");
//ROUTES
const userRouter = require("./routes/users");
const adminRouter = require("./routes/admin");
const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const createError = require("http-errors");
const rateLimit = require("express-rate-limit");

const slugify = require("slugify");

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

//ROUTES
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/public", express.static("public"));

//API limiter
const apilimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 2,
});
// API TEST
app.get("/", apilimiter, (req, res) => {
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
