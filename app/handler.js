const bookshelf = require("./bookshelf");

const createBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
};
