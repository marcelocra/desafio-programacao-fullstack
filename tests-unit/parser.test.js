/* eslint-env jest */
const parseTransactions = require('../src/parser');

var exampleLine = `12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS`;
var exampleMultiLine = `12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS
12021-12-03T11:46:02-03:00DOMINANDO INVESTIMENTOS       0000050000MARIA CANDIDA
22022-01-16T14:13:54-03:00CURSO DE BEM-ESTAR            0000012750THIAGO OLIVEIRA
32022-01-16T14:13:54-03:00CURSO DE BEM-ESTAR            0000004500THIAGO OLIVEIRA
`;

test('parse the transaction type correctly', () => {
  expect(parseTransactions(exampleLine)[0].type).toBe(1);
});

test('parse the date correctly', () => {
  expect(parseTransactions(exampleLine)[0].date).toEqual(
    new Date('2022-01-15T22:20:30Z')
  );
});

test('parse product name correctly', () => {
  expect(parseTransactions(exampleLine)[0].product).toBe('CURSO DE BEM-ESTAR');
});

test('parse price correctly', () => {
  expect(parseTransactions(exampleLine)[0].price).toBe(127.5);
});

test('parse affilate name correctly', () => {
  expect(parseTransactions(exampleLine)[0].affiliateName).toBe('JOSE CARLOS');
});

test('parse many records at the same time', () => {
  let parsedLines = parseTransactions(exampleMultiLine);
  expect(parsedLines[0]).toEqual({
    type: 1,
    date: new Date('2022-01-15T22:20:30Z'),
    product: 'CURSO DE BEM-ESTAR',
    price: 127.5,
    affiliateName: 'JOSE CARLOS',
  });
  expect(parsedLines[1]).toEqual({
    type: 1,
    date: new Date('2021-12-03T14:46:02Z'),
    product: 'DOMINANDO INVESTIMENTOS',
    price: 500.0,
    affiliateName: 'MARIA CANDIDA',
  });
  expect(parsedLines[2]).toEqual({
    type: 2,
    date: new Date('2022-01-16T17:13:54Z'),
    product: 'CURSO DE BEM-ESTAR',
    price: 127.5,
    affiliateName: 'THIAGO OLIVEIRA',
  });
  expect(parsedLines[3]).toEqual({
    type: 3,
    date: new Date('2022-01-16T17:13:54Z'),
    product: 'CURSO DE BEM-ESTAR',
    price: 45.0,
    affiliateName: 'THIAGO OLIVEIRA',
  });
});
