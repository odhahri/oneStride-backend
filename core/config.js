const dotenv = require("dotenv");
const os = require("os");
dotenv.config();

const KEYCLOAK_CLIENT_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
${process.env.KEYCLOAK_CLIENT_PUBLIC_KEY}
-----END PUBLIC KEY-----`;

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  },
  KEYCLOAK_CONFIG: {
    KEYCLOAK_REALM: process.env.KEYCLOAK_REALM,
    KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
    KEYCLOAK_DEFAULT_ACCESS: "DENY",  // DENY or ALLOW
    KEYCLOAK_METHOD_VALIDATE_TOKEN: "DECODE",
    KEYCLOAK_SERVER_URL: process.env.KEYCLOAK_SERVER_URL,
    KEYCLOAK_CLIENT_SECRET_KEY: process.env.KEYCLOAK_CLIENT_SECRET_KEY,
    KEYCLOAK_CLIENT_PUBLIC_KEY: KEYCLOAK_CLIENT_PUBLIC_KEY,
    KEYCLOACK_ADMIN_USERNAME: process.env.KEYCLOACK_ADMIN_USERNAME,
    KEYCLOAK_ADMIN_PASSWORD: process.env.KEYCLOAK_ADMIN_PASSWORD,
  },
};
