/*
  Warnings:

  - Added the required column `isDead` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isDead" BOOLEAN NOT NULL,
ADD COLUMN     "phone" INTEGER NOT NULL;
