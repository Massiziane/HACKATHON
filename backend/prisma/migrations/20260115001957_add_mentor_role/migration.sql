/*
  Warnings:

  - You are about to drop the column `answer` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `options` on the `Question` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'mentor';

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "answer",
DROP COLUMN "options";

-- CreateTable
CREATE TABLE "Reponse" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "bonneReponse" BOOLEAN NOT NULL,
    "questionID" TEXT NOT NULL,

    CONSTRAINT "Reponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reponse" ADD CONSTRAINT "Reponse_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
