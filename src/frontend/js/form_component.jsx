import React from 'react';

/**
 * Handles the form element, submitting the file provided by the user to the server.
 *
 * `setUpdateTransactionUi` is used to signal the table component that there is new
 * data and that the component tree should be updated.
 */
function FormComponent({ setUpdateTransactionUi }) {
  function handleSubmit(event) {
    // Add the spinner button to the UI, to give feedback to
    // the user that the request is happening.
    let submitButton = document.getElementById('submit');
    submitButton.classList.add('is-loading');

    // Do not submit this form. We don't want a page refresh.
    event.preventDefault();

    // Handle the form directly.
    let formData = new FormData();
    formData.append('products', document.getElementById('products').files[0]);

    fetch('/upload_file', {
      method: 'POST',
      body: formData,
    }).then((response) => {
      // Remove the loading state.
      submitButton.classList.remove('is-loading');

      // Force React to update the right part of the component
      // tree without a page refresh.
      setUpdateTransactionUi((x) => !x);

      // Focus the UI in the updated element.
      document.getElementById('transactions').scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" id="products" />
      <br />
      <br />
      <button type="submit" className="button is-dark is-small" id="submit">
        Enviar
      </button>
    </form>
  );
}

export default FormComponent;
