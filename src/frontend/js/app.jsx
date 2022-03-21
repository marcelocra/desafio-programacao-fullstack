import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import UserLoggedInComponent from './user_logged_in_component';
import UserLoggedOutComponent from './user_logged_out_component';

/**
 * Main component.
 */
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      {loggedIn ? (
        <UserLoggedInComponent setLoggedIn={setLoggedIn} />
      ) : (
        <UserLoggedOutComponent setLoggedIn={setLoggedIn} />
      )}
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
