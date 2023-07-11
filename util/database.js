//connecting our app to the db
const mysql = require("mysql2");

//create pool gives a bunch of connections where many queries can be run instead of create a solo connextion every time
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "#Mbatudde",
});

module.exports = pool.promise();

//dive into official docs to learn more about mysql