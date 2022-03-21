function processResponseError(response) {
  if (response.status === 403) {
    alert(
      'Credenciais invalidas ou expiradas. Por favor, faça login novamente.'
    );
    location.reload();
  }
}

export { processResponseError };
