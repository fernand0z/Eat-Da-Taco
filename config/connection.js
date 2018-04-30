//Connection to MySQL Database for Eat-Da-Tacos web app
//Developed by Fernando Zacarias

// Set up MySQL connection.
const mysql = require("mysql");

let connection = mysql.createConnection({
    port: 8080,
    host: "localhost",
    user: "root",
    password: "root",
    database: "tacos_db"
});

// Make connection.
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
