const bookshelf = require("./bookshelf");
import("nanoid")
  .then((module) => {
    nanoid = module.nanoid;
  })
  .catch((err) => {
    console.error(err);
  });

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
    bookshelf[index] = {
      ...bookshelf[index],
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

module.exports = { editBookHandler };
