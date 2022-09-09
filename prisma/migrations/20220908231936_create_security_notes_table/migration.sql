-- CreateTable
CREATE TABLE "securityNotes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "securityNotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "securityNotes_userId_title_key" ON "securityNotes"("userId", "title");

-- AddForeignKey
ALTER TABLE "securityNotes" ADD CONSTRAINT "securityNotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
