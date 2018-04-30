//Controller file for Eat-Da-Tacos web app
//Developed by Fernando Zacarias

//DEPENDENCIES
//======================================================
const express = require("express");
const router = express.Router();

// Import the model (taco.js) to use its database functions.
const tacoModel = require("../models/taco.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    tacoModel.all(function (data) {
        //Variable to hold the data for handlebars rendering
        var hbsObject = {  
            tacos: data
        };
        //!!!!!REMOVE AFTER DEBUGGING
        console.log('Handlebars Object: ' + hbsObject);
        console.log(hbsObject.tacos);
        res.render("index", hbsObject);
    });
});

//Process POST request to create new taco entry in DB
router.post("/api/tacos", function (req, res) {
    tacoModel.create([
        "name", "false"  //False for eaten to be uneaten
    ], [
            req.body.name, req.body.eaten
        ], function (result) {
            // Send back the ID of the new quote
            res.json({ id: result.insertId });
        });
});

//Process PUT request to change taco eaten status
router.put("/api/tacos/:id", function (req, res) {
    var condition =  req.params.id;

    console.log("condition: ", condition);

    tacoModel.update({
        eaten: req.body.eaten
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//Process the delete request for a taco from the DB
router.delete("/api/tacos/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    taco_order.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use.
module.exports = router;
