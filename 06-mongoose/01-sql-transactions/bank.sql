CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  account_number VARCHAR(16) NOT NULL UNIQUE,
  amount FLOAT NOT NULL CHECK(amount >= 0)
);

INSERT INTO accounts VALUES (1, '1938408282984823', 500);
INSERT INTO accounts VALUES (2, '9086509842309840', 1000);

-- ¿Cómo la cuenta 1 le puede transferir $200 a la cuenta 2?

-- Transaction: Es una o más instrucciones de SQL que se ejecutan en una sola operación. Las transacciones siguen el comportamiento de ACID.

BEGIN TRANSACTION; -- A partir de este momento se define la transacción
-- Es decir, todas las instrucciones siguientes formarán parte de la transacción.

-- Recuperamos la información de la cuenta 1
SELECT * FROM accounts WHERE id = 1;

-- Descontamos el dinero de la cuenta 1
UPDATE accounts SET amount = amount - 200 WHERE id = 1;

-- Agregar el dinero a la cuenta 2
UPDATE accounts SET amount = amount + 200 WHERE id = 2;

-- La cuenta 2 tendría un saldo de $1200 y la cuenta 1 tendría $300

-- Para rechazar los cambios se utiliza:
ROLLBACK;

-- Para confirmar los cambios se utiliza:
COMMIT;


--- Las bases de relacionales se basan en el concepto de ACID.

-- Atomicity: En una transacción se ejecutan todas las instrucciones o no se ejecuta ninguna.

-- Consistency: Los datos siempre están actualizados para todas las conexiones de la base de datos.

-- Isolation: Las transacciones no se afectan entre sí.

-- Durability: Las transacciones siempre terminan en un estado válido.

