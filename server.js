const express = require("express");
const app = express();
const port = 3300;
const clients = require("./routes/client.routes.js");
const utilities = require("./utilities/auth.js");
require("dotenv");

const swaggerUi = require("swagger-ui-express"); 
const swaggerDocument = require("./swagger.json")

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {explorer: true})); 

const auth = function (req, res, next) {
  let exceptions = ["/login", "/register", "/clients", "/api-docs"];
  if (exceptions.indexOf(req.url) >= 0) {
    next();
  } else {
    utilities.validateToken(req.headers.authorization, (result) => {
      if (result) {
        next();
      } else {
        res.status(401).send("Invalid Token");
      }
    });
  }
};
app.use(express.json());
app.use(auth);
app.use("/", clients);

app.listen(port, () => {
  console.log("Server Running on port " + port);
});
