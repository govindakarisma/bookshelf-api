const { createBookHandler } = require("./handler");

const routes = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return `<h1>Hola! it's a ${request.method} method</h1>`;
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
];

module.exports = routes;
