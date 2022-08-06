import React, { useState } from 'react';
import constants from '../../constants';
import { processResponseError } from './process_response_error';

function handleSubmit({
  event,
  email,
  password,
  setError,
  increaseCounter,
  setLoggedIn,
}) {
  event.preventDefault();

  if (email === '' || password === '') {
    setError('Por favor, preencha email e senha.');
    increaseCounter();
    return;
  }

  let submitButton = document.getElementById('submit');
  submitButton.classList.add('is-loading');

  // Make the API call to the backend.
  fetch(constants.API_LOG_USER, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      submitButton.classList.remove('is-loading');
      if (!response.ok) {
        throw response;
      }

      return response.json();
    })
    .then((token) => {
      document.cookie = `token=${token}`;
      setLoggedIn(true);
    })
    .catch(processResponseError);
}

/**
 * Shows when the user is logged out.
 */
function UserLoggedOutComponent({ setLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [errorCountdown, setErrorCountdown] = useState(0);

  function increaseCounter() {
    setErrorCountdown((countdown) => {
      if (countdown !== 100) {
        setTimeout(() => {
          increaseCounter();
        }, 10);
        return countdown + 0.5;
      }

      setError(null);
      return 0;
    });
  }

  return (
    <div className="app">
      <section className="section user-logged-out">
        <div className="container has-text-centered">
          <header className="section-header">
            <h1 className="title is-spaced is-size-1-mobile has-text-weight-bold">
              Faça o seu login
            </h1>
            <form
              onSubmit={(event) =>
                handleSubmit({
                  event,
                  password,
                  email,
                  setError,
                  increaseCounter,
                  setLoggedIn,
                })
              }
            >
              <div className="user-logged-out-header">
                <div className="content is-small">
                  <p className="mb-5">
                    {/* TODO: allow user to signup. Right now it support login
                        with fake credentials from the seed (fake) data.*/}
                    {/* Se esse for o seu primeiro acesso, poderá se cadastrar
                        na próxima página. */}
                    <strong>Usuário de teste:</strong> admin@example.com
                    <br />
                    <strong>Senha:</strong> admin
                    <br />
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      type="password"
                      placeholder="Senha"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </p>
                </div>
                {error && (
                  <div className="notification is-danger is-light p-1">
                    {error}
                    <progress
                      className="progress is-small p-1"
                      value={errorCountdown}
                      max="100"
                    ></progress>
                  </div>
                )}
                <button
                  id="submit"
                  className="button is-small is-dark mt-1"
                  type="submit"
                >
                  Enviar
                </button>
              </div>
            </form>
          </header>
        </div>
      </section>
    </div>
  );
}

export default UserLoggedOutComponent;
