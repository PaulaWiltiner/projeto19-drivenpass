/*
  Warnings:

  - You are about to drop the column `titleId` on the `credentials` table. All the data in the column will be lost.
  - You are about to drop the `titles` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,title]` on the table `credentials` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `credentials` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "credentials" DROP CONSTRAINT "credentials_titleId_fkey";

-- AlterTable
ALTER TABLE "credentials" DROP COLUMN "titleId",
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "titles";

-- CreateIndex
CREATE UNIQUE INDEX "credentials_userId_title_key" ON "credentials"("userId", "title");
