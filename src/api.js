const Hapi = require("@hapi/hapi");
const routes = require("./routes");

const InitAndStart = async (ENV) => {
  const { PORT, HOST } = ENV;
  const server = Hapi.server({
    port: PORT,
    host: HOST,
  });

  server.route(routes);

  await server.start();
  console.log(`Server is listening to ${HOST}:${PORT}`);
};

module.exports = { InitAndStart };
