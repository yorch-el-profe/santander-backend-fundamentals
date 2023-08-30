CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(100) NOT NULL,
  telephone VARCHAR(12) NOT NULL
);

CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  publisher VARCHAR(80) NOT NULL,
  pages INTEGER CHECK(pages > 0),
  stock INTEGER CHECK(stock >= 0)
);

CREATE TABLE authors (
  id INTEGER PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
);

CREATE TABLE users_books (
  id_user INTEGER,
  id_book INTEGER,
  date DATE NOT NULL,
  due_date DATE NOT NULL,
  is_active BOOLEAN NOT NULL,
  PRIMARY KEY (id_user, id_book),
  FOREIGN KEY (id_user) REFERENCES users(id),
  FOREIGN KEY (id_book) REFERENCES books(id)
);

CREATE TABLE books_authors (
  id_author INTEGER,
  id_book INTEGER,
  PRIMARY KEY (id_author, id_book),
  FOREIGN KEY (id_author) REFERENCES authors(id),
  FOREIGN KEY (id_book) REFERENCES books(id)
);

select b.title from users u
    inner join users_books ub on ub.id_user = u.id
    inner join books b on ub.id_book = b.id 
where u.id = 1000 and ub.is_active = 1