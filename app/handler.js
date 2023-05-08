// const { nanoid } = require("nanoid");
// import { nanoid } from "nanoid";
const bookshelf = require("./bookshelf");
import("nanoid")
  .then((module) => {
    nanoid = module.nanoid;
  })
  .catch((err) => {
    console.error(err);
  });

const createBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
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

  const res = h.response({
    status: "fail",
    message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
  });
  res.code(400);
  return res;
};

module.exports = { createBookHandler };
