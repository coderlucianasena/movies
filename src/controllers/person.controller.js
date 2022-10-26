const { Person } = require("../models");

const controller = {
  async listAllPersons(req, res) {
    try {
      const listPersons = await Person.findAll();

      return res.json(listPersons);
    } catch (error) {
      console.log(error);
    }
  },

  async getOnePerson(req, res) {
    try {
      const { id } = req.params;
      const person = await Person.findOne({
        where: {
          person_id: id,
        },
      });

      // const person = await Person.findByPk(id)

      return res.json(person);
    } catch (error) {}
  },

  async createPerson(req, res) {
    try {
      const { nome } = req.body;

      if (!nome) {
        return res.status(400).json("Você enviar o parametro nome");
      }

      const newPerson = await Person.create({
        person_name: nome,
      });

      return res.json(newPerson);
    } catch (error) {}
  },

  async updatePerson(req, res) {
    try {
      const { id } = req.params;
      const { nome } = req.body;

      if (!nome) {
        return res.status(400).json("Você enviar o parametro nome");
      }

      await Person.update(
        {
          person_name: nome,
        },
        {
          where: {
            person_id: id,
          },
        }
      );

      const person = await Person.findByPk(id);

      return res.json(person);
    } catch (error) {}
  },

  async deletePerson(req, res) {
    try {
      const { id } = req.params;

      await Person.destroy({
        where: {
          person_id: id,
        },
      });

      res.sendStatus(204);
    } catch (error) {
      if (error.name === "SequelizeForeignKeyConstraintError") {
        return res
          .status(400)
          .json(
            "Existe relacionamento com essa pessoa, não é possivel deletar"
          );
      }
      console.log(error);
    }
  },
};

module.exports = controller;
