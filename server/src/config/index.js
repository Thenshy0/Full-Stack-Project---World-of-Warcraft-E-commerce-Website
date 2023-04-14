require("dotenv").config();

const dev = {
  app: {
    serverPort: process.env.SERVER_PORT || 3001,
    jwtSecretKey: process.env.JWT_SECRET_KEY,
  },
  db: {
    url: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/user-admin",
  },
};

module.exports = dev;
