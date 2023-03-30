const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

app.get("/login", (req, res) => {
  const uname = req.query.uname;
  connection.query(
    `SELECT * FROM users where username="${uname}"`,
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

app.post("/addDiamond", (req, res) => {
  const data = req.body;
  console.log(data);
  const tableName = `${data.userName}_diamonds`;

  const query = `SHOW TABLES LIKE '${tableName}'`;

  connection.query(query, function (error, results) {
    if (error) throw error;
    const createTableQuery =
      "CREATE TABLE `" +
      tableName +
      "` ( `diamond_id` INT(10) NOT NULL AUTO_INCREMENT , `client_id` INT(10) NOT NULL , `employee_id` INT(10) NULL , `packet_no` INT(10) NOT NULL , `cut` FLOAT(10) NOT NULL , `color` VARCHAR(10) NOT NULL , `purity` VARCHAR(10) NOT NULL , `shape` VARCHAR(10) NOT NULL , `i_weight` FLOAT(10) NOT NULL , `a_weight` FLOAT(10) NOT NULL , `d_weight` FLOAT NOT NULL , `received_date` DATE NOT NULL , `deposited_date` DATE NOT NULL , PRIMARY KEY(`diamond_id`) ) ENGINE = InnoDB;";
    const insertQuery =
      "INSERT INTO `" +
      tableName +
      "` (`diamond_id`, `client_id`, `employee_id`, `packet_no`, `cut`, `color`, `purity`, `shape`, `i_weight`, `a_weight`, `d_weight`, `received_date`, `deposited_date`) VALUES ('NULL', '12', '" +
      data.assignedTo +
      "', '" +
      data.packetNo +
      "', '" +
      data.cut +
      "', '" +
      data.color +
      "', '" +
      data.purity +
      "', '" +
      data.shape +
      "', '" +
      data.issueWeight +
      "', '" +
      data.askedWeight +
      "', '" +
      data.depositedWeight +
      "', '" +
      data.receivedDate +
      "', '" +
      data.depositedDate +
      "');";
    if (results.length == 0) {
      console.log(tableName);
      connection.query(createTableQuery, function (err, result) {
        if (err) throw err;
        // console.log(result);
        connection.query(insertQuery, function (err, result) {
          if (err) throw err;
          console.log(result);
          res.send(result);
        });
      });
    } else {
      connection.query(insertQuery, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
    }
  });
});

app.post("/addClient", (req, res) => {
  const data = req.body;
  const tableName = `${data.userName}_clients`;

  const query = `SHOW TABLES LIKE '${tableName}'`;

  connection.query(query, (err, results) => {
    if (err) throw err;
    const createTableQuery =
      "CREATE TABLE `" +
      tableName +
      "` ( `client_id` INT(10) NOT NULL AUTO_INCREMENT , `client_name` VARCHAR(50) NOT NULL ,`company_name` VARCHAR(50) NOT NULL, `phone` INT(10) NOT NULL , `referral` VARCHAR(50) NOT NULL , `address` VARCHAR(50) NOT NULL, PRIMARY KEY (client_id) ) ENGINE = InnoDB;";
    const insertQuery =
      "INSERT INTO `" +
      tableName +
      "` (`client_id`, `client_name`, `company_name` , `phone`, `referral`, `address`) VALUES (NULL, '" +
      data.partyName +
      "', '" +
      data.companyName +
      "', '" +
      data.phone +
      "', '" +
      data.referral +
      "','" +
      data.address +
      "');";
    if (results.length == 0) {
      connection.query(createTableQuery, (err, results) => {
        if (err) throw err;
        connection.query(insertQuery, (err, results) => {
          if (err) throw err;
          res.send(results);
        });
      });
    } else {
      connection.query(insertQuery, (err, results) => {
        if (err) throw err;
        res.send(results);
      });
    }
  });
});

app.post("/addEmployee",(req, res) => {
  const data = req.body;
  const tableName = `${data.userName}_employees`;
  const query = `SHOW TABLES LIKE '${tableName}'`;

  connection.query(query,(err,results)=>{
    if (err) throw err;
    const createTableQuery = "CREATE TABLE `"+tableName+"` (`employee_id` INT(10) NOT NULL AUTO_INCREMENT , `name` VARCHAR(50) NOT NULL , `phone` VARCHAR(10) NOT NULL , `aadhar` INT(12) NOT NULL , `referral` INT(50) NOT NULL , `address` INT(50) NOT NULL , PRIMARY KEY (`employee_id`)) ENGINE = InnoDB;";
    const insertQuery = "INSERT INTO `"+tableName+"` (`employee_id`, `name`, `phone`, `aadhar`, `referral`, `address`) VALUES (NULL, '"+data.employeeName+"', '"+data.phone+"', '"+data.aadharNo+"', '"+data.referral+"', '"+data.address+"');";
    if(results.length==0){
      connection.query(createTableQuery,(err,results)=>{
        if (err) throw err;
        connection.query(insertQuery,(err,results)=>{
          if (err) throw err;
          res.send(results);
        });
      });
    }
    else{
      connection.query(insertQuery,(err,results)=>{
        if (err) throw err;
        res.send(results);
      });
    }
  })
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
