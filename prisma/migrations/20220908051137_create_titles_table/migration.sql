/*
  Warnings:

  - Added the required column `titleId` to the `credentials` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "sessions_token_key";

-- AlterTable
ALTER TABLE "credentials" ADD COLUMN     "titleId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "titles" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "titles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "titles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
