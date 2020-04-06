const express = require("express");
const listRouter = express.Router();
const pool = require("../modules/pool");

listRouter.get("/", (req, res) => {
  const queryText = `SELECT * FROM "list";`;
  pool
    .query(queryText)
    .then((responseDB) => {
      const dbRows = responseDB.rows;
      console.log(dbRows);
      res.send(dbRows);
    })
    .catch((err) => {
      console.log("Error with GET:", err);
      res.sendStatus(500);
    });
});

listRouter.post("/", (req, res) => {
  const dataSentFromClient = req.body;

  const queryText = `INSERT INTO "list" ("task", "complete")
        VALUES ($1, $2);`;

  pool
    .query(queryText, [dataSentFromClient.task, dataSentFromClient.complete])
    .then((responseDb) => {
      console.log(responseDb);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error with POST:", err);
      res.sendStatus(500);
    });
});

module.exports = listRouter;
