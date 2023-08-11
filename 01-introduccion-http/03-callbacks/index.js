// import fs from 'node:fs';
const fs = require("node:fs");

// Callback: Es una función se va a ejecutar en el futuro
// (después de determinada acción)
fs.readFile("readme.txt", "utf-8", function (err, text) {
	if (err) {
		console.log("Ocurrio un error al leer archivo :(");

		console.log(err);
	} else {
		console.log(text);
	}
});

console.log("Leyendo un archivo...");
