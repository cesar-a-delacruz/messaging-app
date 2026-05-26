/*
  Warnings:

  - You are about to drop the `group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `group_member` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "group_member" DROP CONSTRAINT "group_member_group_id_fkey";

-- DropForeignKey
ALTER TABLE "group_member" DROP CONSTRAINT "group_member_user_id_fkey";

-- DropTable
DROP TABLE "group";

-- DropTable
DROP TABLE "group_member";

-- DropEnum
DROP TYPE "group_role";
