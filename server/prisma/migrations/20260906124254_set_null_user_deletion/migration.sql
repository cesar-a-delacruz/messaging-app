-- DropForeignKey
ALTER TABLE "chat_member" DROP CONSTRAINT "chat_member_user_id_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_author_id_fkey";

-- AlterTable
ALTER TABLE "chat_member" ALTER COLUMN "user_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "message" ALTER COLUMN "author_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "chat_member" ADD CONSTRAINT "chat_member_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
