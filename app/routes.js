const { createBookHandler, getBooksHandler } = require("./handler");

const routes = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return {
        message: "Dicoding Backend Developer Submission",
        app_name: "Bookshelf API",
        created_by: {
          name: "Govinda Kharisma Dewa",
          email: "govindakharisma10@gmail.com",
          website: "https://govindakarisma.github.io/my-portfolio",
        },
      };
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
];

module.exports = routes;
