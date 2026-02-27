const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const dboperations = require("./db/queries/dboperations");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/users", dboperations.getursers);
app.post("/users", dboperations.saveuser);
app.put("/users", dboperations.updateuser);
app.delete("/users", dboperations.deleteuser);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
