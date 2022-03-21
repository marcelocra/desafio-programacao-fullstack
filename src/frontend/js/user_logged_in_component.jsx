import React, { useState } from 'react';

import FormComponent from './form_component';
import TableComponent from './table_component';

/**
 * Shows when the user is logged in.
 */
function UserLoggedInComponent({ setLoggedIn }) {
  const [updateTransactionUi, setUpdateTransactionUi] = useState(false);

  return (
    <>
      <nav
        className="navbar"
        role="navigation"
        aria-label="main navigation"
        style={{ backgroundColor: '#d7ff60' }}
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            Hub.la
          </a>

          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={(event) => {
              event.target.classList.toggle('is-active');
              document
                .getElementById('navbar-menu')
                .classList.toggle('is-active');
            }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbar-menu" className="navbar-menu">
          <div className="navbar-start">
            <a
              className="navbar-item"
              href="https://github.com/marcelocra/desafio-programacao-fullstack"
            >
              Documentation
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a
                  className="button is-light"
                  onClick={() => setLoggedIn(false)}
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
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
    </>
  );
}

export default UserLoggedInComponent;
