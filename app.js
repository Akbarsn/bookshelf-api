require("dotenv").config();
const api = require("./src/api");

const environment = {
  PORT: process.env.PORT ?? 5000,
  HOST: process.env.HOST ?? "localhost",
};

api.InitAndStart(environment);
