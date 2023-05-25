require("dotenv").config();

const dev = {
  app: {
    serverPort: process.env.SERVER_PORT || 3001,
    jwtSecretKey: process.env.JWT_SECRET_KEY || "asfgdfgtegdfgdfga",
    jwtAuthorisationKey:
      process.env.JWT_AUTHORISATION_KEY || "asfgdfgtegdfgdfga",
    jwtRefreshKey: process.env.JWT_REFRESH_KEY || "asfgdfgtegdfgdfga",
    smtpUsername: process.env.SMTP_USERNAME,
    smtpPassword: process.env.SMTP_PASSWORD,
    clientUrl: process.env.CLIENT_URL,
  },
  db: {
    url: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/user-admin",
  },
};

module.exports = dev;
