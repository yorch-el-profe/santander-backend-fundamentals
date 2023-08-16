const express = require("express");
const app = express();

const db = [
	{
		id: 1,
		name: "Gansito",
		price: 20,
	},
	{
		id: 2,
		name: "Coca Cola 600ml Sin Azúcar",
		price: 16,
	},
	{
		id: 3,
		name: "Sabritas 20g",
		price: 15,
	},
];

// Obtener todos los productos
app.get("/getProducts", function (request, response) {
	// Envia toda la lista como recurso
	// al cliente

	// .json() convierte los objetos de JS a "JSON"
	response.json(db);
});

// Un API tiene 4 maneras de recibir parámetros
// 1. A través de un pedazo de la URL
// 2. A través del Query String (en la URL)
// 3. A través de los encabezados
// 4. A través del body de la petición

// Obtener el producto con un ID en especifico
// /getProduct/20

// En express para definir que un pedazo de URL
// sea una variable se utiizan los :
// /ruta/algo/:variable -> donde "variable" es dinámico

app.get("/getProduct/:id", function (request, response) {
	// Recuperando la variable ":id" de la URL
	// como una cadena de texto
	const { id } = request.params;
	const product = db.find((x) => x.id.toString() === id);
	response.json(product);
});

app.listen(8080, function () {
	console.log("> Escuchando puerto 8080");
});
