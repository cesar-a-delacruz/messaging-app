/*
  Warnings:

  - You are about to drop the column `receiver_id` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `sender_id` on the `message` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chat_id` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_receiver_id_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_sender_id_fkey";

-- AlterTable
ALTER TABLE "message" DROP COLUMN "receiver_id",
DROP COLUMN "sender_id",
ADD COLUMN     "author_id" TEXT NOT NULL,
ADD COLUMN     "chat_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "chat" (
    "id" TEXT NOT NULL,
    "first_user_id" TEXT NOT NULL,
    "second_user_id" TEXT NOT NULL,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_first_user_id_fkey" FOREIGN KEY ("first_user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_second_user_id_fkey" FOREIGN KEY ("second_user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
