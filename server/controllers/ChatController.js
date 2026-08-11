const CRUDController = require("./CRUDController.js");

module.exports = class ChatController extends CRUDController {
  findAllByUser = async (req, res) => {
    try {
      const rows = await this.repository.findAllByUser(req.user.id);
      if (!rows.length)
        return res
          .status(404)
          .json({ error: `No ${this.itemName} have been found.` })
          .end();
      const response = rows.map((chat) => {
        if (chat.group) chat.profile = chat.group;
        else {
          for (const chatMember of chat.chatMembers) {
            if (chatMember.user.id !== req.user.id)
              chat.profile = chatMember.user;
          }
        }
        return chat;
      });
      console.table(rows);
      return res.status(200).json({ data: response }).end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: `Failed to find any ${this.itemName}.` })
        .end();
    }
  };
  findOneByUsers = async (req, res) => {
    try {
      const row = await this.repository.findOneByUsers(
        req.user.id,
        req.params.otherUserId,
      );

      if (!row)
        return res
          .status(404)
          .json({ error: `This ${this.itemName} doesn't exists.` })
          .end();

      console.info(row);

      const response = {
        currentAuthorId: req.user.id,
        chatId: row.id,
        messages: row.messages,
      };
      return res.status(200).json({ data: response }).end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: `Failed to find ${this.itemName}.` })
        .end();
    }
  };
  findOneByGroup = async (req, res) => {
    try {
      const row = await this.repository.findOneByGroup(req.params.groupId);

      if (!row)
        return res
          .status(404)
          .json({ error: `This ${this.itemName} doesn't exists.` })
          .end();

      console.info(row);

      const response = {
        currentAuthorId: req.user.id,
        chatId: row.id,
        messages: row.messages,
      };
      return res.status(200).json({ data: response }).end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: `Failed to find ${this.itemName}.` })
        .end();
    }
  };
};
