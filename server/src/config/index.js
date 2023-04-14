require("dotenv").config();

const dev = {
  app: {
    serverPort: process.env.SERVER_PORT || 3001,
  },
  db: {
    url: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/test",
  },
};

module.exports = dev;
