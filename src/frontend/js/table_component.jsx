import React from 'react';

import constants from '../../constants';

/**
 * Displays the database elements in a table.
 *
 * `updateTransactionUi` is a signal that the form component send when the
 * transactions are updated. It forces this component to make a new async
 * request and update the table data.
 */
function TableComponent({ updateTransactionUi }) {
  const [tableData, setTableData] = React.useState(new Map());
  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  React.useEffect(() => {
    fetch(constants.API_TRANSACTIONS)
      .then((response) => response.json())
      .then((transactions) => {
        // Process the transactions to show correctly in the UI. It is a simple
        // logic: list all transactions by producer/affiliate name and sum them
        // up.
        let map = new Map();
        for (let t of transactions) {
          if (!map.get(t.name)) {
            map.set(t.name, {
              transactions: [],
              sum: 0,
            });
          }

          let affiliate = map.get(t.name);
          affiliate.transactions.push(t);
          if (t.op === '+') {
            affiliate.sum += t.price;
          } else if (t.op === '-') {
            affiliate.sum -= t.price;
          } else {
            // This shouldn't happen for now.
            console.error(
              "Should not happen. Check the 'operation' in the 'transaction_types' table"
            );
          }
        }

        setTableData(map);
        return map;
      })
      .catch(console.err);
  }, [updateTransactionUi]);

  return (
    <div>
      {tableData.size !== 0 ? (
        Array.from(tableData).map(
          // Applying Array.from in a Map instance returns an array of
          // pairs (2 element arrays). The first element is the key
          // of the original Map (a string here, with the name), and
          // the second element is an object (that has the all transactions
          // for that affiliate, along with the sum money that they gathered).
          ([affiliateName, { transactions, sum }]) => {
            return (
              <div className="content" key={affiliateName}>
                <h4>
                  {affiliateName}: {currencyFormatter.format(sum)}
                </h4>
                <table className="table is-fullwidth is-bordered mb-6">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Descrição</th>
                      <th>Produto</th>
                      <th>Preço</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((t) => {
                      return (
                        <tr key={t.id}>
                          <td>{new Date(t.date).toLocaleString()}</td>
                          <td>{t.desc}</td>
                          <td>{t.pname}</td>
                          <td>{currencyFormatter.format(t.price)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          }
        )
      ) : (
        <p>Nenhuma transação ainda. Carregue um arquivo.</p>
      )}
    </div>
  );
}

export default TableComponent;
