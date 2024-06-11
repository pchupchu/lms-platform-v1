/*
  Warnings:

  - Made the column `name` on table `MuxData` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MuxData" ALTER COLUMN "name" SET NOT NULL;
