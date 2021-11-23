const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const controller = require("../controllers/client.controller");


router.route("/clients").get(function (req, res) {
    if (req.query.nif && req.query.nif != "") {
      controller.listByNif(req, res);
    } else {
      controller.listAll(req, res);
    }
  })
router.route("/register").post(
    [
      body("name").notEmpty().escape(),
      body("age").isNumeric().escape(),
      body("phone").isNumeric().escape(),
      body("email").notEmpty().isEmail().escape(),
      body("nif").notEmpty().escape(),
      body("locality").escape(),
      body("username").notEmpty().escape(),
      body("password").notEmpty().escape(),
    ],
    function (req, res) {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        controller.create(req, res);
      } else {
        res.status(400).send(errors);
      }
    }
  );
router.post('/login',  function (req, res) {
    controller.login(req, res); 
})
router.delete('/clients/:clientID',  function (req, res) {
  controller.remove(req, res); 
})
router.put('/:clientID',function (req, res) {
  controller.update(req, res);
})


module.exports = router;
