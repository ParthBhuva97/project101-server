const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "project101",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

app.get("/display", (req, res) => {
  const uname = req.query.uname;
  connection.query(
    `SELECT password FROM users where username="${uname}"`,
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

app.post("/add", (req, res) => {
  const data = req.body;
  connection.query("INSERT INTO your_table SET ?", data, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...data });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
