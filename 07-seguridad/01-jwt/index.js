const { connect, Schema, model } = require("mongoose");

connect(
	"mongodb+srv://root:root@bedu.5tygoiv.mongodb.net/jwt?retryWrites=true&w=majority"
)
	.then(() => console.log("> Conectado a Mongo Atlas"))
	.catch(() => console.log("> No se puede conectar a Mongo Atlas"));

const UserSchema = new Schema({
	email: { type: String, required: true, unique: true, maxlength: 100 },
	password: { type: String, minlength: 8, maxlength: 50, required: true },
});

const UserModel = model("users", UserSchema);

const express = require("express");
const app = express();

app.use(express.json());

app.get("/register", function (request, response) {});

app.listen(8080, () => {
	console.log("> Escuchando puerto 8080");
});
