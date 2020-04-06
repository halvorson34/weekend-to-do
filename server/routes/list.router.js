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

listRouter.put("/:id", (req, res) => {
  const itemId = req.params.id;
  const newTaskData = req.body;
  const queryText = `UPDATE "list" SET "complete" = $1 WHERE "id" = $2;`;

  pool
    .query(queryText, [newTaskData.complete, itemId])
    .then((responseFromDb) => {
      console.log(responseFromDb);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Error updating list: ${err}`);
      res.sendStatus(500);
    });
});

listRouter.delete("/:id", (req, res) => {
  const itemId = req.params.id;
  const queryText = `DELETE FROM "list" WHERE "id" = $1;`;

  pool
    .query(queryText, [itemId])
    .then((responseFromDb) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error deleting task:", err);
      res.sendStatus(500);
    });
});

module.exports = listRouter;
