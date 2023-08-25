CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username VARCHAR(30) UNIQUE NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(30) NOT NULL,
  telephone VARCHAR(12) UNIQUE NOT NULL,
  birthdate DATE
);

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

-- Para registrar una llave foránea en SQL se usa:
-- FOREIGN KEY (campo) REFERENCES tabla_original(campo_original)

CREATE TABLE songs_artists (
  id_song INTEGER, -- Es una llave foránea de la tabla "songs"
  id_artist INTEGER, -- Es una llave foránea de la tabla "artists"
  PRIMARY KEY (id_song, id_artist),
  FOREIGN KEY (id_song) REFERENCES songs(id),
  FOREIGN KEY (id_artist) REFERENCES artists(id)
);

CREATE TABLE users_songs (
  id_user INTEGER, -- Es una llave foránea de la tabla "users"
  id_song INTEGER, -- Es una llave foránea de la tabla "songs"
  PRIMARY KEY (id_user, id_song),
  FOREIGN KEY (id_user) REFERENCES users(id),
  FOREIGN KEY (id_song) REFERENCES songs(id)
);