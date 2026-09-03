import requestHandler from "@/handlers/requestHandler";

/**
 * Gets and prepres a Chat using a profile's data.
 * @param {Object} profile The profile's data.
 * @returns {Promise<Object>}
 */
export default async function loadChat(profile) {
  let response = {};

  switch (profile.type) {
    case "user":
      response = await requestHandler.get(`chat/otherUser/${profile.id}`);
      break;
    case "group":
      response = await requestHandler.get(`chat/group/${profile.id}`);
      break;
  }

  let result;
  if (!response.error) {
    result = { selected: {}, page: 1, ...response.data };
    result.messages.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  } else result = response;

  return result;
}
