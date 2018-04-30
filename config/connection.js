//Connection to MySQL Database for Eat-Da-Tacos web app
//Developed by Fernando Zacarias

// Set up MySQL connection.
const mysql = require("mysql");

let connection = mysql.createConnection({
    port: 3306,
    host: "s554ongw9quh1xjs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "wh131z5oxw11b5z1",
    password: "mrsx5xkh28wiw12l",
    database: "zhfjhmesitigkuz8"
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
