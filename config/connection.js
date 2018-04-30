//Connection to MySQL Database for Eat-Da-Tacos web app
//Developed by Fernando Zacarias

// Set up MySQL connection.
const mysql = require("mysql");

// let connection = mysql.createConnection({
//     port: 3306,
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "tacos_db"
// });

let connection = mysql.createConnection(process.env.JAWSDB_URL);
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
