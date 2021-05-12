const { nanoid } = require("nanoid");
const Books = require("../models/books");
const {
  ErrorResponse,
  GenericErrorResponse,
  SuccessResponse,
  SuccessNoMsgResponse,
  CustomResponse,
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
  getAllBooksHandler: (request, h) => {
    const books = Books.map((e) => ({
      id: e.id,
      name: e.name,
      publisher: e.publisher,
    }));

    return SuccessNoMsgResponse(h, 200, books);
  },
  getDetailBookByIDHandler: (request, h) => {
    const { bookId } = request.params;
    const book = Books.filter((e) => e.id === bookId);

    if (book.length === 0) {
      return ErrorResponse(h, 404, "Buku tidak ditemukan");
    }

    return SuccessNoMsgResponse(h, 200, { book: book[0] });
  },
  updateBookByIDHandler: (request, h) => {
    const { bookId } = request.params;
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

    if (name === undefined) {
      return ErrorResponse(
        h,
        400,
        "Gagal memperbarui buku. Mohon isi nama buku"
      );
    }
    if (readPage > pageCount) {
      return ErrorResponse(
        h,
        400,
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
      );
    }

    const bookIdx = Books.findIndex((e) => e.id === bookId);
    if (bookIdx < 0) {
      return ErrorResponse(
        h,
        404,
        "Gagal memperbarui buku. Id tidak ditemukan"
      );
    }

    Books[bookIdx] = {
      ...Books[bookIdx],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    };

    return CustomResponse(h, 200, {
      status: "success",
      message: "Buku berhasil diperbarui",
    });
  },
};
