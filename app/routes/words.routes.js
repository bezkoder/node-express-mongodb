module.exports = app => {
  const words = require("../controllers/words.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", words.create);

  // Retrieve all words
  router.get("/", words.findAll);

  // Retrieve all published words
  router.get("/published", words.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", words.findOne);

  // Update a Tutorial with id
  router.put("/:id", words.update);

  // Delete a Tutorial with id
  router.delete("/:id", words.delete);

  // Create a new Tutorial
  router.delete("/", words.deleteAll);

  app.use("/api/v1/words", router);
};
