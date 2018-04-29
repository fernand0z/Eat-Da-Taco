//Main JS file to update page for Eat-Da-Tacos web app
//Developed by Fernando Zacarias

// Make sure we wait to attach our handlers until the DOM is fully loaded.  (Nested functions)
$(function () {
    //Event handler for clicking on the .change-eaten button class
    $(".change-eaten").on("click", function (event) {
        var id = $(this).data("id");
        var newEaten = $(this).data("newEaten");

        var newEatenState = {
            eaten: newEaten
        };

        // Send the PUT request.
        $.ajax("/api/tacos/" + id, {
            type: "PUT",
            data: newEatenState
        }).then(
            function () {
                //!!!REMOVE AFTER DEBUGGING
                console.log("Changed eaten status to", newEaten);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
    //Event handler for submitting a new taco order
    $(".create-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newTaco = {
            name: $("#taco-name").val().trim(),
            eaten: false  //Initialized as false
        };

        // Send the POST request.
        $.ajax("/api/tacos", {
            type: "POST",
            data: newTaco
        }).then(
            function () {
                //!!!REMOVE AFTER DEBUGGING
                console.log("Created new taco");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
    //Event listener for click on delete taco 
    $(".delete-taco").on("click", function (event) {
        var id = $(this).data("id");

        // Send the DELETE request.
        $.ajax("/api/tacos/" + id, {
            type: "DELETE"
        }).then(
            function () {
                console.log("Deleted taco: ", id);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});
