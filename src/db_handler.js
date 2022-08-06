const parseTransactions = require('./parser');

/**
 * Returns all producers/affiliates transactions.
 */
function fetchAllTransactions(db) {
  return db
    .prepare(
      `select 
         t.id as id,
         t.date as date,
         t.price as price,
         a.name as name,
         p.name as pname,
         tt.description as desc,
         tt.operation as op
       from transactions t
       inner join products p on t.product_id = p.id
       inner join affiliates a on t.affiliate_id = a.id
       inner join transaction_types tt on t.transaction_type = tt.type
      `
    )
    .all();
}

/**
 * Parses, normalizes and stores transactions.
 */
function processUploadedFileAndSaveToDatabase(db, fileAsMultilineString) {
  const transactions = parseTransactions(fileAsMultilineString);

  for (let transaction of transactions) {
    let productId = db
      .prepare('select id from products where name = ?')
      .get(transaction.product);
    if (productId) {
      productId = productId.id;
    } else {
      productId = db
        .prepare('insert into products (name) values (?)')
        .run(transaction.product).lastInsertRowid;
    }

    let affiliateId = db
      .prepare('select id from affiliates where name = ?')
      .get(transaction.affiliateName);
    if (affiliateId) {
      affiliateId = affiliateId.id;
    } else {
      affiliateId = db
        .prepare('insert into affiliates (name) values (?)')
        .run(transaction.affiliateName).lastInsertRowid;
    }

    db.prepare(
      `
      insert into transactions
        (transaction_type, product_id, affiliate_id, date, price)
      values
        (?, ?, ?, ?, ?)`
    ).run(
      transaction.type,
      productId,
      affiliateId,
      transaction.date.toISOString(),
      transaction.price
    );
  }
}

/**
 * Retrieves a user from their email.
 */
function getUserByEmail(db, email) {
  return db
    .prepare(
      `select 
       email,
       password,
       role
     from users u
     where u.email = @email
    `
    )
    .get({ email });
}

module.exports = {
  fetchAllTransactions,
  processUploadedFileAndSaveToDatabase,
  getUserByEmail,
};
