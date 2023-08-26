/*
  Warnings:

  - You are about to drop the column `descripption` on the `gyms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gyms" DROP COLUMN "descripption",
ADD COLUMN     "description" TEXT;
