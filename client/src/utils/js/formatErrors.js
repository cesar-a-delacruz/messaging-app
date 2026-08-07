/**
 * Transforms the responses errors (if any) in a request based on the status code
 * @param {Response} response The response returned by a requesteHandler's method.
 * @returns {Object} errors in the response.
 */
export default async function formatErrors(response) {
  switch (response.status) {
    case 401:
    case 403:
      console.error(response.statusText);
      return { error: response.statusText };

    default:
      const json = await response.json();
      console.error(json.error);
      return { error: json.error };
  }
}
