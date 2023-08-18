const express = require("express");
const app = express();
const controller = require("./controller/user");

app.use(express.json());
app.use(express.text());

app.get("/getUsers", controller.getUsers);
app.get("/getUser/:id", controller.getUser);
app.get("/addUser", controller.addUser);

app.listen(8080, function () {
	console.log("> Escuchando puerto 8080");
});
