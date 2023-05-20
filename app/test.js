const bookshelf = require("./bookshelf");
import("nanoid")
  .then((module) => {
    nanoid = module.nanoid;
  })
  .catch((err) => {
    console.error(err);
  });

/** start - create book handling */
const createBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  /** Start Validator */
  if (!name || name === "" || name === null) {
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400);
  }
  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }
  /** End Validator */

  const id = nanoid(16);
  const isFinished = (readPage, pageCount) => readPage === pageCount;
  const finished = isFinished(readPage, pageCount);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt };

  bookshelf.push(newBook);

  const isSuccess = bookshelf.some((book) => book.id === id);

  if (isSuccess) {
    const successResponse = h
      .response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: id,
        },
      })
      .code(201);
    return successResponse;
  } else {
    const errorResponse = h
      .response({
        status: "error",
        message: "Buku gagal ditambahkan",
      })
      .code(500);
    return errorResponse;
  }
};
/** end - create book handling */

/** Start - edit book handling */
const editBookHandler = (request, h) => {
  const { bookId } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  /** Start Validator */
  if (!name || name === "" || name === null) {
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400);
  }
  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }
  /** End Validator */

  const updatedAt = new Date().toISOString();

  const bookIndex = bookshelf.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    bookshelf[bookIndex] = {
      ...bookshelf[bookIndex],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });

    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });

  response.code(404);
  return response;
};
/** end - edit book handling */

module.exports = { createBookHandler, editBookHandler };
