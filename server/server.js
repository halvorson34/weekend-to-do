const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

//ROUTES
const listRouter = require("./routes/list.router");

app.use(express.static("server/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/list", listRouter);

app.listen(PORT, () => {
  console.log("Running server on PORT:", PORT);
});
