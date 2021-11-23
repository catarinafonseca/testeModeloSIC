const bcrypt = require("bcryptjs");
const utilities = require("../utilities/auth.js");
const Model = require("../models/client.model");
const Client = Model.Client;

const create = (req, res) => {
  Client.create({
    name: req.body.name,
    age: req.body.age,
    phone: req.body.phone,
    email: req.body.email,
    nif: req.body.nif,
    locality: req.body.locality,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password),
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).send("Error");
    });
};
const login = (req, res) => {
  Client.findAll({
    where: {
      username: req.body.username,
    },
  })
    .then((client) => {
      if (client.length > 0) {
        bcrypt
          .compare(req.body.password, client[0].password)
          .then(function (result) {
            console.log(result);
            if (result) {
              utilities.generateToken(
                { client: req.body.username },
                (token) => {
                  res.status(200).json(token);
                }
              );
            } else {
              res.status(401).send("Not Authorized");
            }
          });
      } else {
        res.status(401).send("Not Authorized");
      }
    })
    .catch((err) => {
      res.status(400).send("Error");
    });
};
const listByNif = (req, res) => {
  Client.findAll({
    where: {
      nif: req.query.nif,
    },
  })
    .then((list) => {
      res.status(200).json(list);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Error");
    });
};
const listAll = (req, res) => {
  Client.findAll()
    .then((list) => {
      res.status(200).json(list);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Error");
    });
};
const remove = (req, res) => {
  Client.findByPk(req.params.clientID)
  .then((client) => {
    // no data returned means there is no client in DB with that given ID
    if (client === null)
      res.status(404).json({
        message: `Not found client.`,
      });
    else {
      Client.destroy({
        where: {
          id: req.params.clientID,
        }})
        .then((result) => {
          res.status(200).json({
            message: `Client with id=${req.params.clientID} was deleted successfully.`,
          });
        });
        
    }
  })
  .catch((err) => {
    res.status(500).json({
      message: `Error deleting client`,
    });
  });
};
const update = (req, res) => {
  // validate request body data
  if (!req.body || !req.body.name) {
    res.status(400).json({ message: "Request body can not be empty!" });
    return;
  }
  Client.findByPk(req.params.clientID)
    .then((client) => {
      // no data returned means there is no client in DB with that given ID
      if (client === null)
        res.status(404).json({
          message: `Not found client with id ${req.params.clientID}.`,
        });
      else {
        client
          .update(req.body, { where: { id: req.params.clientID } })
          .then((result) => {
            res.status(200).json({
              message: `Client with id=${req.params.clientID} was updated successfully.`,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `Error updating client with id=${req.params.id}.`,
      });
    });
};


exports.login = login;
exports.create = create;
exports.listByNif = listByNif;
exports.listAll = listAll;
exports.remove = remove;
exports.update = update;
