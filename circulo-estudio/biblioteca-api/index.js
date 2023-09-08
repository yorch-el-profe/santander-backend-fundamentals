// Leer las variables de entorno del archivo .env
require("dotenv").config();

// Base de Datos
const { connect, Schema, model } = require("mongoose");

// 1. Conexión con Mongo Atlas
connect(process.env.MONGO_ATLAS_URL)
	.then(() => console.log("> Conectado a Mongo Atlas"))
	.catch(() => {
		console.error("> Error al conectarse con Mongo Atlas");
		process.exit(1); // Proceso termine con ERROR (1)
	});

// 2. Creación de esquemas y modelos
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

const BookModel = model("books", BookSchema);
const AuthorModel = model("authors", AuthorSchema);
