const fs = require("node:fs");
const http = require("node:http");

const server = http.createServer(function (request, response) {
	fs.readFile("index.html", "utf-8", function (err, html) {
		if (err) {
			response.write("ERROR");
		} else {
			response.write(html);
		}

		response.end();
	});
});

server.listen(8080, function () {
	console.log("Servidor escuchando el puerto 8080");
});
