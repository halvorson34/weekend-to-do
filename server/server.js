const express = require("express");
const bodyParser = require("body-parser");
const pg = require("pg");

const app = express();
const Pool = pg.Pool;
const PORT = process.env.PORT || 5000;

const pool = new Pool({
  database: "weekend-to-do-app",
  host: "localhost",
  port: 5432,
  max: 10,
  idelTimeoutMills: 3000,
});

const listRouter = require("./routes/list.router");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("server/public"));

app.listen(PORT, () => {
  console.log("Running server on PORT:", PORT);
});
