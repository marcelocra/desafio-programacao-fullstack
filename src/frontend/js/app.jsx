import React from 'react';
import ReactDOM from 'react-dom';

import FormComponent from './form_component';
import TableComponent from './table_component';

/**
 * Main component.
 */
function App() {
  const [updateTransactionUi, setUpdateTransactionUi] = React.useState(false);

  return (
    <div className="app">
      <section className="section s1">
        <div className="container has-text-centered">
          <header className="section-header">
            <h1 className="title is-spaced is-size-1-mobile has-text-weight-bold">
              Hub.la Manager
            </h1>
            <div className="subtitle is-size-5 is-size-4-tablet">
              <span className="is-block is-size-6 is-size-5-tablet s1-file">
                Ao escolher um arquivo, ele será processado e exibido na seção
                abaixo.
                <br />
                <br />
                <FormComponent
                  setUpdateTransactionUi={setUpdateTransactionUi}
                />
              </span>
            </div>
          </header>
        </div>
      </section>
      <section className="section">
        <div className="container has-text-centered">
          <header className="section-header s2-h1">
            <h1 className="subtitle" id="transactions">
              Transações
            </h1>
          </header>
        </div>
        <div className="columns is-mobile is-centered">
          <div className="column is-three-quarters">
            <TableComponent updateTransactionUi={updateTransactionUi} />
          </div>
        </div>
      </section>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
