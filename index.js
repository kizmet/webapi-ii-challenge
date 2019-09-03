// import server.js
const server = require("./server.js");

// configure port #
const port = 5000;

// listen on port for requests

server.listen(port, function() {
  console.log(`\n === Web API Listening on http://localhost:${port}===`);
});
