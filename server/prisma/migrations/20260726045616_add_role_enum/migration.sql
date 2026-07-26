-- CreateEnum
CREATE TYPE "Role" AS ENUM ('NONE', 'ADMIN');

-- AlterTable
ALTER TABLE "chat_member" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'NONE';
