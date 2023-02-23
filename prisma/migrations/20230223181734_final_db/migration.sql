/*
  Warnings:

  - You are about to drop the `cardType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `securityNotes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_type_fkey";

-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_userId_fkey";

-- DropForeignKey
ALTER TABLE "securityNotes" DROP CONSTRAINT "securityNotes_userId_fkey";

-- DropTable
DROP TABLE "cardType";

-- DropTable
DROP TABLE "cards";

-- DropTable
DROP TABLE "securityNotes";
