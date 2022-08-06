/**
 * Parse the given transaction string, returning an object that looks like the
 * example below.
 *
 * transaction = {             {start, end, size}
 *  type: num                  {    1,   1,    1}
 *  date: Date()               {    2,  26,   25}
 *  product: string            {   27,  56,   30}
 *  price: num                 {   57,  66,   10}
 *  affiliateName: string      {   67,  86,   20}
 * }
 */
function parseTransaction(transaction) {
  return {
    type: parseInt(transaction.slice(0, 1)),
    date: new Date(transaction.slice(1, 26)),
    product: transaction.slice(26, 56).trim(),
    price: parseFloat(transaction.slice(56, 66)) / 100,
    affiliateName: transaction.slice(66, 86),
  };
}

/**
 * Validate the transaction string, returning true if it is valid and false
 * otherwise.
 */
function isValidTransaction(transaction) {
  if (transaction.length < 67 || transaction.length >= 87) {
    return false;
  }

  return true;
}

/**
 * Parses a multiline transaction string, expecting one transaction per line and
 * ignoring invalid lines.
 *
 * Returns an array of transactions, in the format documented in the
 * `parseTransaction` function above.
 */
function parseTransactions(transactions) {
  return transactions
    .split('\n')
    .filter((transaction) => isValidTransaction(transaction))
    .map((transaction) => parseTransaction(transaction));
}

module.exports = parseTransactions;
