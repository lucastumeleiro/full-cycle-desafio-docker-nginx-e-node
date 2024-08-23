const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

const dbConfig = {
  host: "db",
  user: "root",
  password: "password",
  database: "nodedb",
};
const connection = mysql.createConnection(dbConfig);

app.get("/", (_, res) => {
  const name = "Lucas";

  connection.query(`INSERT INTO people (name) VALUES ('${name}')`);

  connection.query(`SELECT name FROM people`, (_, results) => {
    res.send(`
      <body style="    
      background-color: white;
      display: flex;
      align-content: center;
      flex-direction: column;
      align-items: center;">
          <h1>Full Cycle Rocks!</h1>
          <ol>
          ${
            !!results.length
              ? results.map((el) => `<li>${el.name}</li>`).join("")
              : ""
          }
          </ol>
      </body>
    `);
  });
});

app.listen(port, () => {
  console.log("Up in port: ", port);
});
