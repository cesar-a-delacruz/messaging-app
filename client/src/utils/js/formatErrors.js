/**
 * Transforms the responses errors (if any) in a request based on the status code
 * @param {Response} response The response returned by a requesteHandler's method.
 * @returns {Object} errors in the response.
 */
export default async function formatErrors(response) {
  const server = await response.json();
  switch (response.status) {
    case 422:
      console.error(server.errors);
      let errorMessage = server.message;
      Object.keys(server.errors).forEach((error) => {
        errorMessage += "\n" + server.errors[error].msg;
      });
      return { error: errorMessage };
    default:
      console.error(server.message);
      return { error: server.message || JSON.stringify(response) };
  }
}
