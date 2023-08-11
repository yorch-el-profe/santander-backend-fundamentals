const http = require("node:http");

const server = http.createServer(function (request, response) {
	// Agregar datos a la respuesta
	response.write("Hello World from Node.js!!");

	// Termina la petición
	response.end();
});

// Escucho el puerto 8080 para recibir peticiones
server.listen(8080, function () {
	console.log("Servidor escuchando puerto 8080");
});
