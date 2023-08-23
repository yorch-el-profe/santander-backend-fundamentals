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
CREATE TABLE users (
  username VARCHAR(30),
  email VARCHAR(50),
  password VARCHAR(30),
  telephone VARCHAR(12),
  birthdate DATE
);

-- Para eliminar una tabla se utiliza la instrucción
-- DROP TABLE nombre_de_la_tabla;
DROP TABLE users;