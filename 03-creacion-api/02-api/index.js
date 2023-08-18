const express = require("express");
const app = express();

let id = 2;

const db = [
	{
		id: 1,
		name: "Juan Perez",
		age: 30,
	},
	{
		id: 2,
		name: "Luis Dominguez",
		age: 28,
	},
];

// Es un middleware que transforma
// el body que venga en formato application/json
// en un objeto de JavaScript
app.use(express.json());

// text/plain
app.use(express.text());

app.get("/getUsers", function (request, response) {
	response.json(db);
});

app.get("/getUser/:id", function (request, response) {
	const { id } = request.params;
	const user = db.find((x) => x.id.toString() === id);
	response.json(user);
});

app.get("/addUser", function (request, response) {
	const user = request.body; // el body de la petición
	console.log("body:", user);

	// Manera chafa >:( (el Junior)
	// user.id = ++id;
	// db.push(user);

	// Manera moderna :) (el Senior)
	db.push({ ...user, id: ++id });

	response.end();
});

app.listen(8080, function () {
	console.log("> Escuchando puerto 8080");
});
