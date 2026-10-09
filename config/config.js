require("dotenv").config();

const base = {
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || null,
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  dialect: "mysql",
};

module.exports = {
  development: { ...base, database: process.env.DB_NAME || "kiosk_express" },
  test: { ...base, database: process.env.DB_NAME_TEST || "kiosk_express_test" },
  production: { ...base, database: process.env.DB_NAME || "kiosk_express" },
};
