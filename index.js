const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
app.use(bodyParser.json());
app.use(cors());

// Host: sql12.freesqldatabase.com
// Database name: sql12608617
// Database user: sql12608617
// Database password: XADr46M4vr
// Port number: 3306

const connection = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12608617",
  password: "XADr46M4vr",
  database: "sql12608617",
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
