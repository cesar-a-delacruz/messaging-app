/**
 * Transforms the responses errors (if any) in a request based on the status code
 * @param {Response} response The response returned by a requesteHandler's method.
 * @returns {Object} errors in the response.
 */
export default async function formatErrors(response) {
  let errorMessage;
  switch (response.status) {
    case 500:
      const server = await response.json();
      errorMessage = server.message + "\n" + JSON.stringify(server.error);
      console.error(server.error);
      return { error: errorMessage };
    case 422:
      const validation = await response.json();
      console.error(validation.errors);

      errorMessage = validation.message;
      Object.keys(validation.errors).forEach((error) => {
        errorMessage += "\n" + validation.errors[error].msg;
      });
      return { error: errorMessage };
    default:
      console.error(response);
      return { error: JSON.stringify(response) };
  }
}
