module.exports = app => {
  const users = require("../controllers/users.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", users.create);

  // Retrieve all users
  router.get("/", users.findAll);

  // Retrieve all published users
  router.get("/published", users.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", users.findOne);

  // Update a Tutorial with id
  router.put("/:id", users.update);

  // Delete a Tutorial with id
  router.delete("/:id", users.delete);

  // Create a new Tutorial
  router.delete("/", users.deleteAll);

  router.put("/fav/:id/:word", users.markedfav);
  router.put("/unfav/:id/:word", users.movetofav);



  app.use("/api/v1/users", router);
};
