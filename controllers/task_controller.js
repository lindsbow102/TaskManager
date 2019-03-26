var express = require("express");

var router = express.Router();

// Import the model (task.js) to use its database functions.
var task = require("../models/task.js");

// get route -> index
router.get("/", function(req, res) {
  res.redirect("/tasks");
});

// Create all our routes and set up logic within those routes where required.
router.get("/tasks", function(req, res) {
  task.selectAll(function(data) {
    var hbsObject = {
      tasks: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/tasks/create", function(req, res) {
  task.insertOne([
    "task_name", "completed"
  ], [
    req.body.task_name, false
  ], function(result) {
    // Send back the ID of the new quote
    console.log(result);
    res.redirect("/");
  });
});

router.put("/tasks/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  task.updateOne({
    completed: true
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/tasks/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  task.delete(condition, function(result) {
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
