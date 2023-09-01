const { connect, Schema, model } = require("mongoose");

connect("...")
	.then(() => console.log("> Conectado a Mongo Atlas"))
	.catch(() => console.log("> No se puede conectar a Mongo Atlas"));

const UserSchema = new Schema(
	{
		email: { type: String, required: true, unique: true, maxlength: 100 },
		password: { type: String, minlength: 8, maxlength: 50, required: true },
	},
	{ timestamps: true }
);

const UserModel = model("users", UserSchema);

const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const JWT_SECRET = "ssshhhhhh!!!";

app.use(express.json());

app.get("/register", async function (request, response) {
	const data = request.body;

	try {
		const instance = new UserModel(data);
		const user = await instance.save();
		response.json(user);
	} catch (e) {
		response.json({ error: true, stack: e.message });
	}
});

// Endpoint que genera un token JWT para el frontend

// Pasos para generar un JWT
// 1. Verificar que el usuario exista en la base de datos
// 2. Elegir una llave secreta
// 3. Seleccionar el "payload" (lo que vamos a guardar en el token)
// 4. Con el payload y la llave secreta generar un token
// 5. Entregar el token al cliente
app.get("/authenticate", async function (request, response) {
	const { email, password } = request.body;

	// find encuentra 0 ([]) o más documentos
	// findOne encuentra 0 (null) o 1 documento
	// SELECT * FROM users WHERE email = :email
	const user = await UserModel.findOne({ email }).exec();

	// Type Coercion
	if (!user) {
		return response.json({ error: "No existe el usuario" });
	}

	if (user.password !== password) {
		return response.json({ error: "La contraseña es incorrecta" });
	}

	// Generar el JSON WEB TOKEN
	const payload = { _id: user._id, email: user.email };

	// payload: qué voy almacenar en el token
	// secret: la llave para generar/validar el token
	const token = jwt.sign(payload, JWT_SECRET);

	response.json({ token });
});

app.listen(8080, () => {
	console.log("> Escuchando puerto 8080");
});
