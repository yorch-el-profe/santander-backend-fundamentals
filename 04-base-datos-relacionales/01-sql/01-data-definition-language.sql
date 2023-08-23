-- Esto es un comentario de una sola línea

/*
Es un comentario de múltiples líneas

Usuarios
  - nombre
  - correo
  - contraseña
  - telefono
  - fecha de nacimiento

Canciones
  - titulo
  - artista
  - duracion
  - genero
  - album
  - año

Artista
  - nombre
  - pais
  - generos
  - Canciones
  - albumnes

Album
  - nombre
  - año
  - artista
  - Canciones
  - generos
*/

-- Sintaxis para crear una tabla en SQL
-- CREATE TABLE nombre_de_la_tabla (
--  nombre_de_la_columna tipo RESTRICCION,
--  otra_columna tipo RESTRICCION,
--  ...
-- );

-- Tipos de datos
-- TEXT es una cadena de texto sin tamaño especifico
-- VARCHAR(n) es una cadena de texto de tamaño a lo más n
-- DATE es únicamente la fecha
-- DATETIME es fecha con hora

-- Los campos "username", "email" y "telephone" almacenarían valores únicos
-- POR CADA REGISTRO, es decir, no habría dos usuarios con el mismo "username", etc.
-- A este tipo de atributos/columnas se les conoce como "SUPER LLAVE" :D
-- La llave primaria es aquella que el diseñador de base de datos elige.
-- Para especificar que un campo es llave primaria, se utiliza PRIMARY KEY

-- Restricciones
-- Ninguna restricción significa que el campo acepta NULL
-- UNIQUE el cual valida que un campo sea único
-- NOT NULL no permite el valor "NULL"
-- CHECK(condicion) valida que se cumpla la condición especificada
-- PRIMARY KEY es UNIQUE + NOT NULL
-- AUTOINCREMENT incrementa de manera secuencial y automática el id (funcionalidad propia de SQLite)
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username VARCHAR(30) UNIQUE NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(30) NOT NULL,
  telephone VARCHAR(12) UNIQUE NOT NULL,
  birthdate DATE
);

-- Para eliminar una tabla se utiliza la instrucción
-- DROP TABLE nombre_de_la_tabla;
DROP TABLE users;

CREATE TABLE songs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(50) NOT NULL,
  length INTEGER NOT NULL CHECK(length > 0),
  genre VARCHAR(30) NOT NULL,
  year INTEGER NOT NULL CHECK(year >= 1500)
);

CREATE TABLE artists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL,
  country VARCHAR(5) NOT NULL
);

-- Cuando la llave primaria es de dos campos o más
-- se utiliza PRIMARY KEY (campo1, campo2, campo3...)
CREATE TABLE songs_artists (
  id_song INTEGER,
  id_artist INTEGER,
  PRIMARY KEY (id_song, id_artist)
);

CREATE TABLE users_songs (
  id_user INTEGER,
  id_song INTEGER,
  PRIMARY KEY (id_user, id_song)
);

-- Una llave foranea es una referencia de una llave primaria en otra tabla.

-- Relacionar artistas con canciones

-- "Los artistas interpretan canciones"
-- "Un artista interpreta una o más canciones" (uno a muchos)
-- "Una canción es interpretada por uno o más artistas" (muchos a uno)
-- La relación "artista - canción " es "MUCHOS A MUCHOS"

-- Tenemos que averiguar si la relación es:
-- uno a uno
-- uno a muchos/muchos a uno
-- muchos a muchos

-- "Los usuarios guardan canciones"
-- "Un usuario puede guardar una o más canciones" (Uno a muchos)
-- "Una canción puede ser guardada por uno o más usuarios" (Muchos a uno)
-- La relación "usuario - cancion" es "MUCHOS A MUCHOS"

-- "Los albumnes tienen canciones"
-- "Un album tiene muchas canciones" (Uno a muchos)
-- La relación "cancion - album" es "UNO A MUCHOS"


-- Cuando una relación es MUCHOS A MUCHOS se crea una nueva tabla
-- donde los campos son las llaves de primarias de las dos tablas originales