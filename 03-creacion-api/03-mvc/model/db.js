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

let id = 2;

function getAll() {
	return db;
}

function getById(id) {
	return db.find((x) => x.id === id);
}

function add(data) {
	db.push({ ...data, id: ++id });
}

module.exports = {
	getAll,
	getById,
	add,
};
