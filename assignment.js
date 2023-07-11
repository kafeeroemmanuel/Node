//const http = require("http");

const express = require("express");

const app = express(); //calls the express function and now i can use it

app.use((req, res, next) => {
  console.log("In the middleware");
});

// const server = http.createServer(app);

// server.listen(3000);

// both lines of code can be shortened with one
app.listen(3002);
