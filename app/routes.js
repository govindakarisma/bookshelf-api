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
];

module.exports = routes;
