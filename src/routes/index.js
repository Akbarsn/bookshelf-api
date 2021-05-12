const handlers = require("../handlers");

module.exports = [
  {
    method: "POST",
    path: "/books",
    handler: handlers.createBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: handlers.getAllBooksHandler,
  },
];
