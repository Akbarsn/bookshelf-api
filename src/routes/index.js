const { createBookHandler } = require("../handlers");

module.exports = [
  {
    method: "POST",
    path: "/books",
    handler: createBookHandler,
  },
];
