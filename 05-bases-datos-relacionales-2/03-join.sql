-- A Beto le gustan las canciones 1, 18335 y 789090.
INSERT INTO users_songs VALUES (1000, 1), (1000, 18335), (1000, 789090);
INSERT INTO users_songs VALUES (1001, 1), (1000, 28), (1000, 3452786);
INSERT INTO users_songs VALUES (1002, 112), (1002, 48), (1002, 789090), (1002, 1);

-- pragma foreign_keys=on; Activa la validación de las llaves foráneas

-- SELECT * FROM users JOIN users_songs ON users.id = users_songs.id_user;
-- INNER JOIN es lo mismo que JOIN
SELECT title
FROM users u 
  JOIN users_songs us ON u.id = us.id_user
  JOIN songs s ON s.id = us.id_song
WHERE u.id = 1000;