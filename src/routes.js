const { createBookHandler, getBooksHandler, showBookHandler, editBookHandler, deleteBookHandler } = require("./handler");

const routes = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return h
        .response({
          message: "Dicoding Backend Developer Submission",
          app_name: "Bookshelf API",
          created_by: {
            name: "Govinda Kharisma Dewa",
            email: "govindakharisma10@gmail.com",
            website: "https://govindakarisma.github.io/my-portfolio",
          },
        })
        .code(200);
    },
  },
  {
    method: "*",
    path: "/",
    handler: () => {
      return `This route can only be accessed with the GET method`;
    },
  },
  {
    method: "POST",
    path: "/books",
    handler: createBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getBooksHandler,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: showBookHandler,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editBookHandler,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookHandler,
  },
];

module.exports = routes;
