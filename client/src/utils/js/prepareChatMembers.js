/**
 * Prepares the users to create chat members.
 * @param {Array} users Array of users with their id.
 * @param {string?} chatId The chat to associate the chat members with.
 * @returns {string}
 */
export default function prepareChatMembers(users, chatId) {
  const chatMembers = users.map((user) => {
    const member = { userId: !user.user ? user.id : user.user.id };
    if (chatId) member.chatId = chatId;
    return member;
  });
  return JSON.stringify(chatMembers);
}
