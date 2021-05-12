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
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: handlers.getDetailBookByIDHandler,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: handlers.updateBookByIDHandler,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: handlers.deleteBookHandler,
  },
];
