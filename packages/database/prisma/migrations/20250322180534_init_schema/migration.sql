/*
  Warnings:

  - Added the required column `disabled` to the `Websites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Websites" ADD COLUMN     "disabled" BOOLEAN NOT NULL;
