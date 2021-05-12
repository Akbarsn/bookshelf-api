const { nanoid } = require("nanoid");
const Books = require("../models/books");
const {
  ErrorResponse,
  GenericErrorResponse,
  SuccessResponse,
} = require("../utils/custom_response");

module.exports = {
  createBookHandler: (request, h) => {
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = request.payload;

    if (name === "" || name === undefined) {
      return ErrorResponse(
        h,
        400,
        "Gagal menambahkan buku. Mohon isi nama buku"
      );
    }

    if (readPage > pageCount) {
      return ErrorResponse(
        h,
        400,
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
      );
    }

    const uid = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const isFinishRead = pageCount === readPage;

    const newBook = {
      id: uid,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished: isFinishRead,
      reading,
      insertedAt,
      updatedAt,
    };

    Books.push(newBook);

    const isSuccess = Books.filter((e) => e.id === newBook.id).length > 0;
    if (isSuccess) {
      return SuccessResponse(h, 201, "Buku berhasil ditambahkan", {
        bookId: newBook.id,
      });
    }
    return GenericErrorResponse(h, "Buku gagal ditambahkan");
  },
};
