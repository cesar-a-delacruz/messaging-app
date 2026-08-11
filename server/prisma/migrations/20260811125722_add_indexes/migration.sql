-- CreateIndex
CREATE INDEX "chat_group_id_idx" ON "chat"("group_id");

-- CreateIndex
CREATE INDEX "group_id_idx" ON "group"("id");

-- CreateIndex
CREATE INDEX "message_chat_id_idx" ON "message"("chat_id");

-- CreateIndex
CREATE INDEX "user_id_idx" ON "user"("id");
