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
  if (!name || name === "") {
    const res = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    res.code(400);
    return res;
  }
  if (readPage > pageCount) {
    const res = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    res.code(400);
    return res;
  }
  /** End Validator */

  const id = nanoid(16);

  // const isFinished = (readPage, pageCount) => {
  //   if (readPage === pageCount) {
  //     return true;
  //   }
  //   if (readPage < pageCount) {
  //     return false;
  //   }
  // };

  const isFinished = (readPage, pageCount) => readPage === pageCount;

  const finished = isFinished(readPage, pageCount);

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt };

  bookshelf.push(newBook);

  const isSuccess = bookshelf.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const res = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    res.code(201);
    return res;
  }

  // const res = h.response({
  //   status: "fail",
  //   message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
  // });
  // res.code(400);
  // return res;
  const res = h.response({
    status: "error",
    message: "Buku gagal ditambahkan",
  });
  res.code(500);
  return res;
};
/** end - create book handling */

/** start - get all book handling */
const getBooksHandler = (response, h) => {
  const sortedBooks = bookshelf.sort((a, b) => new Date(b.insertedAt) - new Date(a.insertedAt));
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
/** end - show detail handling */

module.exports = { createBookHandler, getBooksHandler };
