const express = require("express");
const personController = require("../controllers/person.controller");
const routes = express.Router();

routes.get("/person", personController.listAllPersons);
routes.get("/person/:id", personController.getOnePerson);
routes.post("/person", personController.createPerson);
routes.put("/person/:id", personController.updatePerson);
routes.delete("/person/:id", personController.deletePerson);

module.exports = routes;
