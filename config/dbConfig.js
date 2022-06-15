if (process.env.MIGRATE) {
  require("dotenv").config();
}

const dev = {
  username: process.env.DEV_USER,
  password: process.env.DEV_PASSWORD,
  database: process.env.DEV_DATABASE,
  host: process.env.DEV_HOST,
  port: process.env.DEV_POST,
  dialect: process.env.DEV_DIALECT,
  logging: (msg) => {},
  define: { timestamps: false },
};

module.exports = { development: dev, test: null, production: null };
