/* eslint-env jest */
const fs = require('fs');

const testFile = 'test.sqlite3';
const db = require('better-sqlite3')(testFile);

const {
  fetchAllTransactions,
  processUploadedFileAndSaveToDatabase,
} = require('./db_handler');

beforeAll(() => {
  const create_database = fs.readFileSync('./db/create_database.sql', 'utf-8');
  db.exec(create_database);

  // Populate database with fake data.
  const fake_data = fs.readFileSync('./db/fake_data.sql', 'utf-8');
  db.exec(fake_data);
});

afterAll(() => {
  fs.rmSync(testFile);
});

test('fetch all transactions from db', () => {
  let transactions = fetchAllTransactions(db);

  expect(transactions).toEqual([
    {
      date: '2022-04-13T13:35:00.000Z',
      desc: 'Comissão recebida',
      id: 1,
      name: 'Laura',
      op: '+',
      pname: 'Dev Full Stack',
      price: 200,
    },
    {
      date: '2022-04-14T13:35:00.000Z',
      desc: 'Comissão paga',
      id: 2,
      name: 'Lorena',
      op: '-',
      pname: 'Curso de Bem Estar',
      price: 300,
    },
    {
      date: '2022-04-15T13:35:00.000Z',
      desc: 'Venda afiliado',
      id: 3,
      name: 'Paulo',
      op: '+',
      pname: 'O seu curso',
      price: 400,
    },
    {
      date: '2022-04-16T13:35:00.000Z',
      desc: 'Venda produtor',
      id: 4,
      name: 'Lorena',
      op: '+',
      pname: 'Dev Full Stack',
      price: 500,
    },
  ]);
});

test('check if processed file string is stored correctly', () => {
  let multilineStr = `12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS
12021-12-03T11:46:02-03:00DOMINANDO INVESTIMENTOS       0000050000MARIA CANDIDA
22022-01-16T14:13:54-03:00CURSO DE BEM-ESTAR            0000012750THIAGO OLIVEIRA
32022-01-16T14:13:54-03:00CURSO DE BEM-ESTAR            0000004500THIAGO OLIVEIRA
42022-01-16T14:13:54-03:00CURSO DE BEM-ESTAR            0000004500JOSE CARLOS
12022-01-22T08:59:13-03:00DOMINANDO INVESTIMENTOS       0000050000MARIA CANDIDA
12022-02-01T23:35:43-03:00DESENVOLVEDOR FULL STACK      0000155000ELIANA NOGUEIRA
`;
  processUploadedFileAndSaveToDatabase(db, multilineStr);

  expect(db.prepare('select id, name from affiliates').all()).toEqual([
    // Inserted for the whole test suite.
    { id: 1, name: 'Laura' },
    { id: 2, name: 'Paulo' },
    { id: 3, name: 'Lorena' },
    // Inserted for this test.
    { id: 4, name: 'JOSE CARLOS' },
    { id: 5, name: 'MARIA CANDIDA' },
    { id: 6, name: 'THIAGO OLIVEIRA' },
    { id: 7, name: 'ELIANA NOGUEIRA' },
  ]);

  expect(db.prepare('select name from products').all()).toEqual([
    // Inserted for the whole test suite.
    { name: 'Dev Full Stack' },
    { name: 'Curso de Bem Estar' },
    { name: 'O seu curso' },
    // Inserted for this test.
    { name: 'CURSO DE BEM-ESTAR' },
    { name: 'DOMINANDO INVESTIMENTOS' },
    { name: 'DESENVOLVEDOR FULL STACK' },
  ]);

  expect(
    db
      .prepare(
        `select transaction_type as t,
              product_id as p,
              affiliate_id as a,
              date as d,
              price pr
       from transactions`
      )
      .all()
  ).toEqual([
    // Inserted for the whole test suite.
    { t: 4, p: 1, a: 1, d: '2022-04-13T13:35:00.000Z', pr: 200 },
    { t: 3, p: 2, a: 3, d: '2022-04-14T13:35:00.000Z', pr: 300 },
    { t: 2, p: 3, a: 2, d: '2022-04-15T13:35:00.000Z', pr: 400 },
    { t: 1, p: 1, a: 3, d: '2022-04-16T13:35:00.000Z', pr: 500 },
    // Inserted for this test.
    { t: 1, p: 4, a: 4, d: '2022-01-15T22:20:30.000Z', pr: 127.5 },
    { t: 1, p: 5, a: 5, d: '2021-12-03T14:46:02.000Z', pr: 500.0 },
    { t: 2, p: 4, a: 6, d: '2022-01-16T17:13:54.000Z', pr: 127.5 },
    { t: 3, p: 4, a: 6, d: '2022-01-16T17:13:54.000Z', pr: 45.0 },
    { t: 4, p: 4, a: 4, d: '2022-01-16T17:13:54.000Z', pr: 45.0 },
    { t: 1, p: 5, a: 5, d: '2022-01-22T11:59:13.000Z', pr: 500.0 },
    { t: 1, p: 6, a: 7, d: '2022-02-02T02:35:43.000Z', pr: 1550.0 },
  ]);
});
