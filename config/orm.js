//Configuration of the object relational mapping for Eat-Da-Tacos web app
//Created by Fernando Zacarias

// Import MySQL connection module that was exported
const connection = require("../config/connection.js");

// Helper function for SQL syntax.
// The helper function below loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(obj) {
    var arr = [];

    // loop through the keys and push the key/value as a string into arr
    for (var key in obj) {
        var value = obj[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(obj, key)) {
            // if string with spaces, add quotations 
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + ": " + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
    all: function (tableInput, callBack) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            callBack(result);
        });
    },
    create: function (table, cols, vals, callBack) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        //!!!REMOVE AFTER DEBUGGING
        console.log('DB Query: ' + queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }

            callBack(result);
        });
    },
    // An example of objColVals would be {name: panther, sleepy: true}
    update: function (table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += "eaten = true "
        queryString += " WHERE id= ";
        queryString += condition;  //True or false for whether taco has been eaten 

        //!!!!!!REMOVE AFTER DEBUGGING
        console.log('DB Query: ' + queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    //  INCLUDE
    // delete: function (table, condition, cb) {
    //     var queryString = "DELETE FROM " + table;
    //     queryString += " WHERE ";
    //     queryString += condition;

    //     connection.query(queryString, function (err, result) {
    //         if (err) {
    //             throw err;
    //         }
    //         cb(result);
    //     });
    // }
};

// Export the orm object for the model (taco.js).
module.exports = orm;
