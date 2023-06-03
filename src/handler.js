const bookshelf = require("./bookshelf");
import("nanoid")
  .then((module) => {
    nanoid = module.nanoid;
  })
  .catch((err) => {
    console.error(err);
  });

/** Start Validator */
const validateBook = (book) => {
  const { name, pageCount, readPage } = book;
  /** handling if name is not input  */
  if (!name || name === "" || name === null) {
    return {
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    };
  }
  /** handling if readPage is greater than pageCount  */
  if (readPage > pageCount) {
    return {
      status: "fail",
      message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    };
  }

  return null;
};
/** End Validator */

/** start - create book handling */
const createBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  /** Validation */
  const validationError = validateBook({ name, pageCount, readPage });
  if (validationError) {
    return h.response(validationError).code(400);
  }

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

/** start - get all book handling */
const getBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  let filteredBooks = bookshelf;
  /** Search by book name */
  if (name) {
    const searchKeyword = name.toLowerCase();
    filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(searchKeyword));
  }
  /** Filtering data by reading true or false */
  if (reading !== undefined) {
    const isReading = reading === "1";
    filteredBooks = filteredBooks.filter((book) => book.reading === isReading);
  }
  /** Filtering data by finished or unfinished */
  if (finished !== undefined) {
    const isFinished = finished === "1";
    filteredBooks = filteredBooks.filter((book) => book.finished === isFinished);
  }
  /** Get all data sort by latest */
  const sortedBooks = filteredBooks.sort((a, b) => new Date(b.insertedAt) - new Date(a.insertedAt));
  /** Show result */
  return {
    status: "success",
    data: {
      books: sortedBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  };
};
/** End - get all book handling */

/** start - show detail book handling */
const showBookHandler = (request, h) => {
  const { bookId } = request.params;

  const book = bookshelf.find((book) => book.id === bookId);

  if (book) {
    return {
      status: "success",
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });

  response.code(404);
  return response;
};
/** end - show detail handling */

/** Start - edit book handling */
const editBookHandler = (request, h) => {
  const { bookId } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  /** Validation */
  const validationError = validateBook({ name, pageCount, readPage });
  if (validationError) {
    return h.response(validationError).code(400);
  }

  const updatedAt = new Date().toISOString();

  const bookIndex = bookshelf.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1 && bookshelf[bookIndex]) {
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

/** start - delete book handling */
const deleteBookHandler = (request, h) => {
  const { bookId } = request.params;

  const bookIndex = bookshelf.find((book) => book.id === bookId);

  if (bookIndex !== -1) {
    bookshelf.splice(bookIndex, 1);

    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });

  response.code(404);
  return response;
};
/** end - delete book handling */

module.exports = { createBookHandler, getBooksHandler, showBookHandler, editBookHandler, deleteBookHandler };
