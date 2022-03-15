-------------------------------------------------------
-- Create and seed the transaction types table.


CREATE TABLE IF NOT EXISTS transaction_types (
  type INTEGER PRIMARY KEY,
  description TEXT NOT NULL,
  nature TEXT NOT NULL,
  operation TEXT NOT NULL
);

INSERT INTO transaction_types
  (type, description, nature, operation)
VALUES
  (1, 'Venda produtor', 'Entrada', '+'),
  (2, 'Venda afiliado', 'Entrada', '+'),
  (3, 'Comissão paga', 'Saída', '-'),
  (4, 'Comissão recebida', 'Entrada', '+');


-------------------------------------------------------


CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);


-------------------------------------------------------


CREATE TABLE IF NOT EXISTS affiliates (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);


-------------------------------------------------------


CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY,
  transaction_type INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  affiliate_id INTEGER NOT NULL,
  date TEXT NOT NULL,
  price REAL NOT NULL,
  FOREIGN KEY (transaction_type)
    REFERENCES transaction_types (type)
      ON DELETE CASCADE
      ON UPDATE NO ACTION,
  FOREIGN KEY (product_id)
    REFERENCES products (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION,
  FOREIGN KEY (affiliate_id)
    REFERENCES affiliates (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);