/*
  Warnings:

  - The primary key for the `Note` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Note" DROP CONSTRAINT "Note_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Note_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Note_id_seq";
