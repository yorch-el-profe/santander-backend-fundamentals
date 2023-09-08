// I. Leer las variables de entorno del archivo .env
require("dotenv").config();

// II. Base de Datos
const { connect, Schema, model } = require("mongoose");

// Conexión con Mongo Atlas
connect(process.env.MONGO_ATLAS_URL)
	.then(() => console.log("> Conectado a Mongo Atlas"))
	.catch(() => {
		console.error("> Error al conectarse con Mongo Atlas");
		process.exit(1); // Proceso termine con ERROR (1)
	});

// Creación de esquemas y modelos
const BookSchema = new Schema(
	{
		isbn: { type: String, unique: true, required: true, maxlength: 20 },
		title: { type: String, required: true, maxlength: 200 },
		year: { type: Number, required: true, min: -2000, max: 3000 },
		author: { type: Schema.Types.ObjectId, ref: "authors" },
	},
	{ timestamps: true }
);

const AuthorSchema = new Schema(
	{
		name: { type: String, required: true, maxlength: 200 },
		age: { type: Number, min: 0 },
		isDead: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const UserSchema = new Schema(
	{
		username: { type: String, required: true, unique: true, maxlength: 50 },
		password: { type: String, maxlength: 50, minlength: 8 },
	},
	{ timestamps: true }
);

const BookModel = model("books", BookSchema);
const AuthorModel = model("authors", AuthorSchema);
const UserModel = model("users", UserSchema);

// III. Seguridad
const jwt = require("jsonwebtoken");

function jwtValidation(request, response, next) {
	const token = request.get("Authorization");

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);

		// Creando un objeto "user" dentro del request
		request.user = payload;

		next();
	} catch (e) {
		response
			.status(401)
			.json({ error: "No tienes autorización para este recurso" });
	}
}

// IV. API
const express = require("express");
const app = express();

app.use(express.json());

// Esto es equivalente a lo usado abajo
// app.use("/createAuthor", jwtValidation);
// app.use("/createBook", jwtValidation);

app.get("/getAllAuthors", async function (request, response) {
	try {
		const documents = await AuthorModel.find().exec();
		response.json(documents);
	} catch (e) {
		console.error(e);
		response.json({ error: "Error al consultar todos los autores de la BD" });
	}
});

app.get("/getAuthor/:_id", async function (request, response) {
	try {
		const { _id } = request.params;
		const document = await AuthorModel.findById(_id).exec();
		response.json(document);
	} catch (e) {
		console.error(e);
		response.json({ error: "Error al obtener el autor" });
	}
});

app.get("/createAuthor", jwtValidation, async function (request, response) {
	try {
		const instance = new AuthorModel(request.body);
		const document = await instance.save();
		response.json(document);
	} catch (e) {
		console.error(e);
		response.json({ error: "Error al insertar un autor" });
	}
});

app.get("/getAllBooks", async function (request, response) {
	try {
		const documents = await BookModel.find().exec();
		response.json(documents);
	} catch (e) {
		console.error(e);
		response.json({ error: "Error al obtener todos los libros" });
	}
});

app.get("/getBook/:_id", async function (request, response) {
	try {
		const { _id } = request.params;
		const document = await BookModel.findById(_id)
			.populate("author", { name: 1, isDead: 1, _id: 0 })
			.exec();
		response.json(document);
	} catch (e) {
		console.error(e);
		response.json({ error: "Error al obtener el libro" });
	}
});

app.get("/createBook", jwtValidation, async function (request, response) {
	try {
		const { author } = request.body;

		const authorDocument = await AuthorModel.findById(author).exec();

		if (!authorDocument) {
			return response.json({ error: "El autor no existe" });
		}

		const instance = new BookModel(request.body);
		const document = await instance.save();
		response.json(document);
	} catch (e) {
		console.error(e);
		response.json({ error: "Error al crear un libro" });
	}
});

app.get("/createUser", async function (request, response) {
	try {
		const instance = await UserModel(request.body);
		const document = await instance.save();
		response.json(document);
	} catch (e) {
		console.error(e);
		response.json({ error: "Error al crear usuario" });
	}
});

app.get("/login", async function (request, response) {
	try {
		const { username, password } = request.body;

		// { username } => { "username": username }
		const document = await UserModel.findOne({ username }).exec();

		if (!document) {
			return response.json({ error: "El usuario o contraseña son inválidos" });
		}

		if (document.password !== password) {
			return response.json({ error: "El usuario o contraseña son inválidos" });
		}

		const token = jwt.sign({ _id: document._id }, process.env.JWT_SECRET);
		response.json({ token });
	} catch (e) {
		console.error(e);
		response.json({ error: "Errror al iniciar sesión" });
	}
});

app.listen(process.env.PORT, function () {
	console.log("> Escuchando puerto " + process.env.PORT);
});
