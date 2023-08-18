const model = require("../model/db");

function getUsers(request, response) {
	const data = model.getAll();
	response.json(data);
}

function getUser(request, response) {
	const { id } = request.params.id;
	const data = model.getById(parseInt(id));
	response.json(data);
}

function addUser(request, response) {
	const data = request.body;
	model.add(data);
	response.end();
}

module.exports = {
	getUsers,
	getUser,
	addUser,
};
