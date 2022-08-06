insert into affiliates (name)
values
  ('Laura'),
  ('Paulo'),
  ('Lorena');

insert into products (name)
values
  ('Dev Full Stack'),
  ('Curso de Bem Estar'),
  ('O seu curso');

insert into transactions
  (transaction_type, product_id, affiliate_id, date, price)
values
  (4, 1, 1, '2022-04-13T13:35:00.000Z', 200),
  (3, 2, 3, '2022-04-14T13:35:00.000Z', 300),
  (2, 3, 2, '2022-04-15T13:35:00.000Z', 400),
  (1, 1, 3, '2022-04-16T13:35:00.000Z', 500);